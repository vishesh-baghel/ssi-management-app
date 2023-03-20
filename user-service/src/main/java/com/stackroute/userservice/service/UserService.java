package com.stackroute.userservice.service;

import com.stackroute.userservice.dto.PasswordRequest;
import com.stackroute.userservice.dto.UserRequest;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;

import java.util.Optional;

public interface UserService {
    User registerUser(UserRequest userRequest);

    VerificationToken generateVerificationToken();

    void saveVerificationTokenForUser(User registeredUser, VerificationToken generateVerificationToken);

    String validateVerificationToken(String token);

    String resetPassword(PasswordRequest passwordRequest);

    User findUserByEmail(String email);

    void createPasswordResetTokenForUser(User user, String token);

    String validatePasswordResetToken(String token);

    Optional<User> getUserByPasswordResetToken(String token);

    void changePassword(User user, String newPassword);
}
