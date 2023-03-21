package com.stackroute.userservice.service;

import com.stackroute.userservice.dto.PasswordRequest;
import com.stackroute.userservice.dto.UserRequest;
import com.stackroute.userservice.dto.UserResponse;
import com.stackroute.userservice.entity.PasswordResetToken;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;
import com.stackroute.userservice.exceptions.UserNotFoundException;
import com.stackroute.userservice.repository.PasswordResetTokenRepository;
import com.stackroute.userservice.repository.UserRepository;
import com.stackroute.userservice.repository.VerificationTokenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Slf4j
public class UserServiceImpl implements UserService{

    static final String TOKEN_VALID = "valid";
    static final String INVALID_TOKEN = "invalid Token";
    static final String USER_NOT_FOUND = "User not found";
    static final String TOKEN_EXPIRED = "Token expired";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public User registerUser(UserRequest userRequest) {
        User user = User.builder()
                .userName(userRequest.getUserName())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .email(userRequest.getEmail())
                .companyName(userRequest.getCompanyName())
                .role(userRequest.getRole())
                .build();
        userRepository.save(user);
        return user;
    }

    @Override
    public VerificationToken generateVerificationToken() {
        String token = UUID.randomUUID().toString();
        return new VerificationToken(token);
    }

    @Override
    public void saveVerificationTokenForUser(User registeredUser, VerificationToken Token) {
        VerificationToken verificationToken = new VerificationToken(registeredUser, Token.getToken());
        verificationTokenRepository.save(verificationToken);
    }

    @Override
    public String validateVerificationToken(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        if (verificationToken == null) {
            return INVALID_TOKEN;
        }

        User user = verificationToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((verificationToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            verificationTokenRepository.delete(verificationToken);
            return TOKEN_EXPIRED;
        }

        user.setEnabled(true);
        userRepository.save(user);
        return TOKEN_VALID;
    }

    @Override
    public String resetPassword(PasswordRequest passwordRequest) {
        return null;
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken passwordResetToken = new PasswordResetToken(user, token);
        passwordResetTokenRepository.save(passwordResetToken);
    }

    @Override
    public String validatePasswordResetToken(String token) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
        if (passwordResetToken == null) {
            return INVALID_TOKEN;
        }

        Calendar calendar = Calendar.getInstance();
        if ((passwordResetToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            passwordResetTokenRepository.delete(passwordResetToken);
            return TOKEN_EXPIRED;
        }
        return TOKEN_VALID;
    }

    @Override
    public Optional<User> getUserByPasswordResetToken(String token) {
        return Optional.ofNullable(passwordResetTokenRepository.findByToken(token).getUser());
    }

    @Override
    public void changePassword(User user, String newPassword) {
       user.setPassword(passwordEncoder.encode(newPassword));
       userRepository.save(user);
    }

    @Override
    public User findUserByUserName(String userName) throws UserNotFoundException {
        if (userRepository.findByUserName(userName) == null) {
            throw new UserNotFoundException(USER_NOT_FOUND);
        }
        return userRepository.findByUserName(userName);
    }

    @Override
    public UserResponse createUserResponse(User user, int offset, int count) {
        List<User> users = new ArrayList<>();
        users.add(user);
        return UserResponse.builder()
                .message("user details")
                .status(200)
                .results(users)
                .build();
    }

    @Override
    public List<User> findAllUsersByCompanyName(
            String companyName, int pageNumber, int pageSize,
            String sortBy, String orderBy) throws UserNotFoundException {
        Pageable pageable;
        if (orderBy.equalsIgnoreCase("asc")) {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        }

        if (userRepository.findAllByCompanyName(companyName, pageable).isEmpty()) {
            throw new UserNotFoundException(USER_NOT_FOUND);
        }

        return userRepository.findAllByCompanyName(companyName, pageable);
    }

    @Override
    public UserResponse createUserResponseList(List<User> users, int offset, int count, String exportLink) {
        return UserResponse.builder()
                .message("users working in the given company")
                .status(200)
                .offset((long) offset)
                .count((long) count)
                .total((long) users.size())
                .exportLink(exportLink)
                .results(users)
                .build();
    }

    @Override
    public List<User> findAllUsersByRole(String role, int pageNumber, int pageSize, String sortBy, String orderBy) throws UserNotFoundException {
        Pageable pageable;
        if (orderBy.equalsIgnoreCase("asc")) {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        }
        if (userRepository.findAllByRole(role, pageable).isEmpty()) {
            throw new UserNotFoundException(USER_NOT_FOUND);
        }
        return userRepository.findAllByRole(role, pageable);
    }

    @Override
    public void updateUser(User user, Boolean isAdmin) {
        if (Boolean.TRUE.equals(isAdmin)) {
            user.setRole("admin");
            user.setAdmin(true);
        } else {
            user.setRole("user");
            user.setAdmin(false);
        }
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(User user) {
        tokenRepository.deleteByUserId(user.getId());
        userRepository.deleteByEmail(user.getEmail());
    }
}
