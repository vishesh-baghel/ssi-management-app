package com.stackroute.userservice.controller;

import com.stackroute.userservice.dto.*;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;
import com.stackroute.userservice.exceptions.InvalidRequestBodyException;
import com.stackroute.userservice.exceptions.InvalidTokenException;
import com.stackroute.userservice.exceptions.UserNotFoundException;
import com.stackroute.userservice.export.ExcelGenerator;
import com.stackroute.userservice.service.JwtService;
import com.stackroute.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/user")
@RefreshScope
@Slf4j
@CrossOrigin
public class UserServiceController {

    static final String USER_NOT_FOUND = "User not found";
    static final String USER_ALREADY_EXISTS = "User already exists";
    static final String USER_REGISTERED = "User registered successfully";
    static final String USER_UPDATED = "User updated successfully";
    static final String USER_DELETED = "User deleted successfully";
    static final String USER_VERIFIED = "User verified successfully";
    static final String TOKEN_INVALID = "Token is invalid";
    static final String USER_VERIFICATION_FAILED = "User verification failed";
    static final String USER_PASSWORD_UPDATED = "User password updated successfully";
    static final String USER_PASSWORD_RESET_TOKEN_INVALID = "User password reset token is invalid";
    static final String USERNAME_CANNOT_BE_EMPTY = "User name cannot be empty";
    static final String PASSWORD_CANNOT_BE_EMPTY = "Password cannot be empty";
    static final String EMAIL_CANNOT_BE_EMPTY = "Email cannot be empty";
    static final String COMPANY_NAME_CANNOT_BE_EMPTY = "Company name cannot be empty";
    static final String ROLE_CANNOT_BE_EMPTY = "Role cannot be empty";
    static final String IS_ADMIN_CANNOT_BE_EMPTY = "admin role value cannot be empty";
    static final String ALL_ACCESS = "all access";
    static final String VIEW_ONLY_ACCESS = "view only access";

    List<User> exportList;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }

    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('user')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String registerUser(@RequestBody RegisterRequest registerRequest, HttpServletRequest request) throws InvalidRequestBodyException, InvalidTokenException {
        if (registerRequest.getUserName() == null || registerRequest.getUserName().isEmpty()) {
            throw new InvalidRequestBodyException(USERNAME_CANNOT_BE_EMPTY);
        }

        if (registerRequest.getPassword() == null || registerRequest.getPassword().isEmpty()) {
            throw new InvalidRequestBodyException(PASSWORD_CANNOT_BE_EMPTY);
        }

        if (registerRequest.getEmail() == null || registerRequest.getEmail().isEmpty()) {
            throw new InvalidRequestBodyException(EMAIL_CANNOT_BE_EMPTY);
        }

        if (registerRequest.getCompanyName() == null || registerRequest.getCompanyName().isEmpty()) {
            throw new InvalidRequestBodyException(COMPANY_NAME_CANNOT_BE_EMPTY);
        }

        if (registerRequest.getRole() == null || registerRequest.getRole().isEmpty()) {
            throw new InvalidRequestBodyException(ROLE_CANNOT_BE_EMPTY);
        }

        Optional<User> user = Optional.ofNullable(userService.findUserByEmail(registerRequest.getEmail()));
        if (user.isPresent()) {
            throw new InvalidRequestBodyException(USER_ALREADY_EXISTS);
        }

        User registeredUser = userService.registerUser(registerRequest);
        VerificationToken token = userService.generateVerificationToken();
        userService.saveVerificationTokenForUser(registeredUser, token);
        sendVerificationTokenMail(registeredUser, applicationUrl(request), token);
        return USER_REGISTERED;
    }

    @GetMapping("/verifyRegistration")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyRole('admin', 'user')")
    public String verifyRegistration(@RequestParam("token") String token) {
        String result = userService.validateVerificationToken(token);
        if (result.equalsIgnoreCase("valid")) {
            return USER_VERIFIED;
        }
        return USER_VERIFICATION_FAILED;
    }

    @PostMapping("/resetPassword")
    @PreAuthorize("hasAnyRole('admin', 'user')")
    public String resetPassword(@RequestBody PasswordRequest passwordRequest, HttpServletRequest request) throws UserNotFoundException, InvalidTokenException {
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
    @PreAuthorize("hasAnyRole('admin', 'user')")
    public String savePassword(@RequestParam("token") String token, @RequestBody PasswordRequest passwordRequest) throws InvalidTokenException, UserNotFoundException {
        String result = userService.validatePasswordResetToken(token);

        if (!result.equalsIgnoreCase("valid")) {
            return USER_PASSWORD_RESET_TOKEN_INVALID;
        }
        Optional<User> user = userService.getUserByPasswordResetToken(token);
        if (user.isPresent()) {
            userService.changePassword(user.get(), passwordRequest.getNewPassword());
            return USER_PASSWORD_UPDATED;
        } else {
            return TOKEN_INVALID;
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PreAuthorize("hasAnyRole('admin', 'user')")
    public UserResponse fetchUserDetails(@RequestBody UserRequest userRequest) throws UserNotFoundException {
        String userName = userRequest.getUserName();
        String email = userRequest.getEmail();
        String companyName = userRequest.getCompanyName();
        String role = userRequest.getRole();
        String sortBy = userRequest.getSortBy();
        String orderBy = userRequest.getOrderBy();
        int pageNumber = userRequest.getOffset();
        int pageSize = userRequest.getCount();

        if (sortBy == null || sortBy.isEmpty() || orderBy == null || orderBy.isEmpty() || pageNumber < 0 || pageSize < 0) {
            sortBy = "userName";
            orderBy = "asc";
            pageNumber = 0;
            pageSize = 10;
        }

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
            String exportLink = exportUtil(users);
            log.info("Users by company name: {}", users);
            return userService.createUserResponseList(users, pageNumber, pageSize, exportLink);
        }
        if (role != null){
            List<User> users = userService.findAllUsersByRole(role, pageNumber, pageSize, sortBy, orderBy);
            String exportLink = exportUtil(users);
            log.info("Users by role: {}", users);
            return userService.createUserResponseList(users, pageNumber, pageSize, exportLink);
        }
        return null;
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('admin')")
    private String updateUser(@RequestBody UserRequest userRequest) throws InvalidRequestBodyException, UserNotFoundException {
        String email = userRequest.getEmail();
        Boolean isAdmin = userRequest.getIsAdmin();

        if (email == null || email.isEmpty()) {
            throw new InvalidRequestBodyException(EMAIL_CANNOT_BE_EMPTY);
        }
        if (isAdmin == null) {
            throw new InvalidRequestBodyException(IS_ADMIN_CANNOT_BE_EMPTY);
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            throw new InvalidRequestBodyException(USER_NOT_FOUND);
        }
        userService.updateUser(user, isAdmin);
        return USER_UPDATED;
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('admin')")
    private String deleteUser(@RequestBody UserRequest userRequest) throws InvalidRequestBodyException, UserNotFoundException {
        String email = userRequest.getEmail();

        if (email == null || email.isEmpty()) {
            throw new InvalidRequestBodyException(EMAIL_CANNOT_BE_EMPTY);
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            throw new InvalidRequestBodyException(USER_NOT_FOUND);
        }
        userService.deleteUser(user);
        return USER_DELETED;
    }

    @GetMapping("/export-to-excel")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyRole('admin', 'user')")
    public void exportIntoExcelFile(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=user" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        ExcelGenerator generator = new ExcelGenerator(exportList);
        generator.generateExcelFile(response);
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

    private String exportUtil(List<User> user) {
        exportList = user;
        return "http://localhost:8080/user/export-to-excel";
    }
}
