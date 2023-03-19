package com.stackroute.userservice.service;

import com.stackroute.userservice.dto.UserRequest;
import com.stackroute.userservice.entity.User;

public interface UserService {
    User registerUser(UserRequest userRequest);
}
