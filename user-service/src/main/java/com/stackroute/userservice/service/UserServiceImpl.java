package com.stackroute.userservice.service;

import com.stackroute.userservice.dto.*;
import com.stackroute.userservice.entity.PasswordResetToken;
import com.stackroute.userservice.entity.Role;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;
import com.stackroute.userservice.exceptions.InvalidTokenException;
import com.stackroute.userservice.exceptions.UserNotFoundException;
import com.stackroute.userservice.repository.PasswordResetTokenRepository;
import com.stackroute.userservice.repository.RoleRepository;
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
@Transactional
public class UserServiceImpl implements UserService{

    static final String TOKEN_VALID = "valid";
    static final String INVALID_TOKEN = "invalid Token";
    static final String USER_NOT_FOUND = "User not found";
    static final String TOKEN_EXPIRED = "Token expired";
    static final String ALL_ACCESS = "All Access";
    static final String VIEW_ONLY_ACCESS = "View Only Access";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(RegisterRequest registerRequest) {
        String roleDescription = registerRequest.getRole().equalsIgnoreCase("admin") ? ALL_ACCESS : VIEW_ONLY_ACCESS;
        Set<Role> roles = new HashSet<>();
        Role role = Role.builder()
                .roleName(registerRequest.getRole())
                .roleDescription(roleDescription)
                .build();
        roles.add(role);
        roleRepository.save(role);
        User user = User.builder()
                .userName(registerRequest.getUserName())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .email(registerRequest.getEmail())
                .companyName(registerRequest.getCompanyName())
                .roles(roles)
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
    public VerificationToken saveVerificationTokenForUser(User registeredUser, VerificationToken token) throws InvalidTokenException {
        if (token == null) {
            throw new InvalidTokenException(INVALID_TOKEN);
        }
        VerificationToken verificationToken = new VerificationToken(registeredUser, token.getToken());
        verificationTokenRepository.save(verificationToken);
        return verificationToken;
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
    public User findUserByEmail(String email) {
        if (userRepository == null) {
            throw new NullPointerException("userRepository is null");
        }
        return userRepository.findByEmail(email);
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String token) throws InvalidTokenException, UserNotFoundException {
        if (token == null) {
            throw new InvalidTokenException(INVALID_TOKEN);
        }
        if (user == null) {
            throw new UserNotFoundException(USER_NOT_FOUND);
        }
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
    public Optional<User> getUserByPasswordResetToken(String token) throws InvalidTokenException {
        if (token == null) {
            throw new InvalidTokenException(INVALID_TOKEN);
        }
        return Optional.ofNullable(passwordResetTokenRepository.findByToken(token).getUser());
    }

    @Override
    public void changePassword(User user, String newPassword) throws UserNotFoundException {
       if (user == null) {
           throw new UserNotFoundException(USER_NOT_FOUND);
       }
       user.setPassword(passwordEncoder.encode(newPassword));
       userRepository.save(user);
    }

    @Override
    public User findUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public UserResponse createUserResponse(User user, int offset, int count) throws UserNotFoundException {
        if (user == null) {
            throw new UserNotFoundException(USER_NOT_FOUND);
        }
        if (offset < 0 || count < 0) {
            throw new IllegalArgumentException("offset and count should be greater than 0");
        }
        List<User> users = new ArrayList<>();
        users.add(user);
        return UserResponse.builder()
                .message("user details")
                .status(200)
                .results(users)
                .offset((long) offset)
                .count((long) count)
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
        if (offset < 0 || count < 0) {
            throw new IllegalArgumentException("offset and count should be greater than 0");
        }
        if (users.isEmpty()) {
            throw new NullPointerException("users list is empty");
        }

        long totalUsers = userRepository.count();
        return UserResponse.builder()
                .message("users working in the given company")
                .status(200)
                .offset((long) offset)
                .count((long) count)
                .total((long) totalUsers)
                .exportLink(exportLink)
                .results(users)
                .build();
    }

    @Override
    public List<User> findAllUsersByRole(String role, int pageNumber, int pageSize, String sortBy, String orderBy) throws UserNotFoundException {
//        Set<Role> roles = new HashSet<>();
//        Role userRole = Role.builder()
//                .roleName("user")
//                .roleDescription(VIEW_ONLY_ACCESS)
//                .build();
//        Role adminRole = Role.builder()
//                .roleName("admin")
//                .roleDescription(ALL_ACCESS)
//                .build();
//
//        if (role.equalsIgnoreCase("user")) {
//            roles.add(userRole);
//        } else if (role.equalsIgnoreCase("admin")) {
//            roles.add(adminRole);
//        } else {
//            throw new IllegalArgumentException("role should be either user or admin");
//        }

        Pageable pageable;
        if (orderBy.equalsIgnoreCase("asc")) {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        }
        if (userRepository.findAllByRoles(role, pageable).isEmpty()) {
            throw new UserNotFoundException(USER_NOT_FOUND);
        }
        return userRepository.findAllByRoles(role, pageable);
    }

    @Override
    public String updateUser(User user, Boolean isAdmin) {
        Set<Role> adminRoleList = new HashSet<>();
        Set<Role> userRoleList = new HashSet<>();
        Role adminRole = Role.builder()
                .roleName("admin")
                .roleDescription(ALL_ACCESS)
                .build();
        Role userRole = Role.builder()
                .roleName("user")
                .roleDescription(VIEW_ONLY_ACCESS)
                .build();
        adminRoleList.add(adminRole);
        userRoleList.add(userRole);
        if (user == null) {
            throw new NullPointerException("user is null");
        }
        if (Boolean.TRUE.equals(isAdmin)) {
            user.setRoles(adminRoleList);
            user.setAdmin(true);
        } else {
            user.setRoles(userRoleList);
            user.setAdmin(false);
        }
        userRepository.save(user);
        return "user updated successfully";
    }

    @Override
    public String deleteUser(User user) {
        if (user == null) {
            throw new NullPointerException("user is null");
        }
        tokenRepository.deleteByUserId(user.getId());
        userRepository.deleteByEmail(user.getEmail());
        return "user deleted successfully";
    }

    @Override
    public List<User> findAllUsers(int pageNumber, int pageSize, String sortBy, String orderBy) {
        return userRepository.findAll(PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).ascending())).getContent();
    }
}
