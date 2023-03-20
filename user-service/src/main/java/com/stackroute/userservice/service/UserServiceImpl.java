package com.stackroute.userservice.service;

import com.stackroute.userservice.dto.PasswordRequest;
import com.stackroute.userservice.dto.UserRequest;
import com.stackroute.userservice.entity.PasswordResetToken;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;
import com.stackroute.userservice.repository.PasswordResetTokenRepository;
import com.stackroute.userservice.repository.UserRepository;
import com.stackroute.userservice.repository.VerificationTokenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

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
            return "invalidToken";
        }

        User user = verificationToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((verificationToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            verificationTokenRepository.delete(verificationToken);
            return "expired";
        }

        user.setEnabled(true);
        userRepository.save(user);
        return "valid";
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
            return "invalid Token";
        }

        Calendar calendar = Calendar.getInstance();
        if ((passwordResetToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            passwordResetTokenRepository.delete(passwordResetToken);
            return "expired";
        }
        return "valid";
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
}
