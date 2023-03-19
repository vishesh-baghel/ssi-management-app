package com.stackroute.userservice.service;

import com.stackroute.userservice.dto.UserRequest;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(UserRequest userRequest) {
        User user = User.builder()
                .userName(userRequest.getUserName())
                .password(userRequest.getPassword())
                .email(userRequest.getEmail())
                .companyName(userRequest.getCompanyName())
                .role(userRequest.getRole())
                .build();
        userRepository.save(user);
        return user;
    }

}
