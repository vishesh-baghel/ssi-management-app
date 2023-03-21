package com.stackroute.userservice.service;

import com.stackroute.userservice.dto.PasswordRequest;
import com.stackroute.userservice.dto.UserRequest;
import com.stackroute.userservice.dto.UserResponse;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;
import com.stackroute.userservice.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
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

    User findUserByUserName(String userName) throws UserNotFoundException;

    UserResponse createUserResponse(User user, int offset, int count);

    List<User> findAllUsersByCompanyName(String companyName, int pageNumber, int pageSize, String sortBy, String orderBy) throws UserNotFoundException;

    UserResponse createUserResponseList(List<User> users, int offset, int count);

    List<User> findAllUsersByRole(String role, int pageNumber, int pageSize, String sortBy, String orderBy) throws UserNotFoundException;
}
