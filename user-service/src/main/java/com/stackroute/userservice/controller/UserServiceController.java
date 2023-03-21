package com.stackroute.userservice.controller;

import com.stackroute.userservice.dto.PasswordRequest;
import com.stackroute.userservice.dto.UserRequest;
import com.stackroute.userservice.dto.UserResponse;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;
import com.stackroute.userservice.exceptions.InvalidRequestBodyException;
import com.stackroute.userservice.exceptions.UserNotFoundException;
import com.stackroute.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserServiceController {

    static final String USER_NOT_FOUND = "User not found";
    static final String USER_ALREADY_EXISTS = "User already exists";
    static final String USER_REGISTERED = "User registered successfully";
    static final String USER_UPDATED = "User updated successfully";
    static final String USER_DELETED = "User deleted successfully";
    static final String USER_VERIFIED = "User verified successfully";
    static final String TOKEN_INVALID = "Token is invalid";
    static final String USER_VERIFICATION_FAILED = "User verification failed";
    static final String USER_PASSWORD_RESET = "User password reset successfully";
    static final String USER_PASSWORD_UPDATED = "User password updated successfully";
    static final String USER_PASSWORD_RESET_TOKEN_INVALID = "User password reset token is invalid";
    static final String USER_PASSWORD_RESET_TOKEN_EXPIRED = "User password reset token is expired";
    static final String USERNAME_CANNOT_BE_EMPTY = "User name cannot be empty";
    static final String PASSWORD_CANNOT_BE_EMPTY = "Password cannot be empty";
    static final String EMAIL_CANNOT_BE_EMPTY = "Email cannot be empty";
    static final String COMPANY_NAME_CANNOT_BE_EMPTY = "Company name cannot be empty";
    static final String ROLE_CANNOT_BE_EMPTY = "Role cannot be empty";

    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String registerUser( @RequestBody UserRequest userRequest, HttpServletRequest request) throws InvalidRequestBodyException {
        if (userRequest.getUserName() == null || userRequest.getUserName().isEmpty()) {
            throw new InvalidRequestBodyException(USERNAME_CANNOT_BE_EMPTY);
        }

        if (userRequest.getPassword() == null || userRequest.getPassword().isEmpty()) {
            throw new InvalidRequestBodyException(PASSWORD_CANNOT_BE_EMPTY);
        }

        if (userRequest.getEmail() == null || userRequest.getEmail().isEmpty()) {
            throw new InvalidRequestBodyException(EMAIL_CANNOT_BE_EMPTY);
        }

        if (userRequest.getCompanyName() == null || userRequest.getCompanyName().isEmpty()) {
            throw new InvalidRequestBodyException(COMPANY_NAME_CANNOT_BE_EMPTY);
        }

        if (userRequest.getRole() == null || userRequest.getRole().isEmpty()) {
            throw new InvalidRequestBodyException(ROLE_CANNOT_BE_EMPTY);
        }

        Optional<User> user = Optional.ofNullable(userService.findUserByEmail(userRequest.getEmail()));
        if (user.isPresent()) {
            throw new InvalidRequestBodyException(USER_ALREADY_EXISTS);
        }

        User registeredUser = userService.registerUser(userRequest);
        VerificationToken token = userService.generateVerificationToken();
        userService.saveVerificationTokenForUser(registeredUser, token);
        sendVerificationTokenMail(registeredUser, applicationUrl(request), token);
        return USER_REGISTERED;
    }

    @GetMapping("/verifyRegistration")
    @ResponseStatus(HttpStatus.OK)
    public String verifyRegistration(@RequestParam("token") String token) {
        String result = userService.validateVerificationToken(token);
        if (result.equalsIgnoreCase("valid")) {
            return USER_VERIFIED;
        }
        return USER_VERIFICATION_FAILED;
    }

    @PostMapping("/resetPassword")
    public String resetPassword(@RequestBody PasswordRequest passwordRequest, HttpServletRequest request) {
        User user = userService.findUserByEmail(passwordRequest.getEmail());
        String url = "";
        if (user != null) {
            String token = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(user, token);
            url = passwordResetTokenMail(user, applicationUrl(request), token);
        }
        return url;
    }

    @PostMapping("/savePassword")
    public String savePassword(@RequestParam("token") String token, @RequestBody PasswordRequest passwordRequest) {
        String result = userService.validatePasswordResetToken(token);

        if (!result.equalsIgnoreCase("valid")) {
            return USER_PASSWORD_RESET_TOKEN_INVALID;
        }
        Optional<User> user = userService.getUserByPasswordResetToken(token);
        if (user.isPresent()) {
            userService.changePassword(user.get(), passwordRequest.getNewPassword());
            return USER_PASSWORD_UPDATED;
        } else {
            return TOKEN_INVALID    ;
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserResponse userDetails(@RequestBody UserRequest userRequest) throws UserNotFoundException {
        String userName = userRequest.getUserName();
        String email = userRequest.getEmail();
        String companyName = userRequest.getCompanyName();
        String role = userRequest.getRole();
        String sortBy = userRequest.getSortBy();
        String orderBy = userRequest.getOrderBy();
        int pageNumber = userRequest.getOffset();
        int pageSize = userRequest.getCount();

        if (userName != null) {
            User user = userService.findUserByUserName(userName);
            return userService.createUserResponse(user, pageNumber, pageSize);
        }
        if (email != null){
            User user = userService.findUserByEmail(email);
            return userService.createUserResponse(user, pageNumber, pageSize);
        }
        if (companyName != null){
            List<User> users = userService.findAllUsersByCompanyName(companyName, pageNumber, pageSize, sortBy, orderBy);
            log.info("Users by company name: {}", users);
            return userService.createUserResponseList(users, pageNumber, pageSize);
        }
        if (role != null){
            List<User> users = userService.findAllUsersByRole(role, pageNumber, pageSize, sortBy, orderBy);
            log.info("Users by role: {}", users);
            return userService.createUserResponseList(users, pageNumber, pageSize);
        }
        return null;
    }

    private String passwordResetTokenMail(User user, String applicationUrl, String token) {
        log.info("Sending password reset token mail to user: {}", user.getUserName());
        log.info("Password reset token: {}", token);
        log.info("Password reset url: {}", applicationUrl + "/user/resetPassword?token=" + token);
        return applicationUrl + "/user/resetPassword?token=" + token;
    }

    private void sendVerificationTokenMail(User registeredUser, String applicationUrl, VerificationToken token) {
        log.info("Sending verification token mail to user: {}", registeredUser.getUserName());
        log.info("Verification token: {}", token.getToken());
        log.info("Verification url: {}", applicationUrl + "/user/verifyRegistration?token=" + token.getToken());
    }

    private String applicationUrl(HttpServletRequest request) {
        return "http://" + request.getServerName()
                + ":" + request.getServerPort() + request.getContextPath();
    }
}
