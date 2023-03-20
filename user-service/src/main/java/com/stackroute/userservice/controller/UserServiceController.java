package com.stackroute.userservice.controller;

import com.stackroute.userservice.dto.PasswordRequest;
import com.stackroute.userservice.dto.UserRequest;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;
import com.stackroute.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserServiceController {

    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String registerUser(@RequestBody UserRequest userRequest, HttpServletRequest request) {
        User registeredUser = userService.registerUser(userRequest);
        VerificationToken token = userService.generateVerificationToken();
        userService.saveVerificationTokenForUser(registeredUser, token);
        sendVerificationTokenMail(registeredUser, applicationUrl(request), token);
        return "User registered successfully";
    }

    @GetMapping("/verifyRegistration")
    public String verifyRegistration(@RequestParam("token") String token) {
        String result = userService.validateVerificationToken(token);
        if (result.equalsIgnoreCase("valid")) {
            return "Your account has been verified successfully";
        }
        return "Your account verification failed. Please try again";
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
            return "Invalid token";
        }
        Optional<User> user = userService.getUserByPasswordResetToken(token);
        if (user.isPresent()) {
            userService.changePassword(user.get(), passwordRequest.getNewPassword());
            return "Password reset successfully";
        } else {
            return "Invalid token";
        }
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
