package com.stackroute.userservice.service;

import com.stackroute.userservice.dto.*;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;
import com.stackroute.userservice.exceptions.InvalidTokenException;
import com.stackroute.userservice.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    User registerUser(RegisterRequest userRequest);

    VerificationToken generateVerificationToken();

    VerificationToken saveVerificationTokenForUser(User registeredUser, VerificationToken generateVerificationToken) throws InvalidTokenException;

    String validateVerificationToken(String token);

    User findUserByEmail(String email);

    void createPasswordResetTokenForUser(User user, String token) throws InvalidTokenException, UserNotFoundException;

    String validatePasswordResetToken(String token);

    Optional<User> getUserByPasswordResetToken(String token) throws InvalidTokenException;

    void changePassword(User user, String newPassword) throws UserNotFoundException;

    User findUserByUserName(String userName) throws UserNotFoundException;

    UserResponse createUserResponse(User user, int offset, int count) throws UserNotFoundException;

    List<User> findAllUsersByCompanyName(String companyName, int pageNumber, int pageSize, String sortBy, String orderBy) throws UserNotFoundException;

    UserResponse createUserResponseList(List<User> users, int offset, int count, String exportLink);

    List<User> findAllUsersByRole(String role, int pageNumber, int pageSize, String sortBy, String orderBy) throws UserNotFoundException;

    String updateUser(User user, Boolean isAdmin);

    String deleteUser(User user);

    List<User> findAllUsers(int pageNumber, int pageSize, String sortBy, String orderBy);

//    void saveRoleForUser(User registeredUser, String role, String roleDescription);
}
