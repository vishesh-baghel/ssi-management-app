package com.stackroute.userservice.controller;

import com.stackroute.userservice.dto.UserRequest;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;
import com.stackroute.userservice.exceptions.InvalidRequestBodyException;
import com.stackroute.userservice.exceptions.InvalidTokenException;
import com.stackroute.userservice.repository.UserRepository;
import com.stackroute.userservice.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class UserServiceControllerTest {

    @InjectMocks
    private UserServiceController userServiceController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserService userService;

    @Mock
    private HttpServletRequest request;

    @Autowired
    private User user;

    @Autowired
    private UserRequest userRequest;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .userName("test")
                .email("test@mail.com")
                .role("user")
                .password("password")
                .build();

        userRequest = UserRequest.builder()
                .userName("test")
                .email("test@mail.com")
                .companyName("test")
                .role("user")
                .password("password")
                .build();
    }

    @AfterEach
    void tearDown() {
        user = null;
    }

    @Test
    @DisplayName("test for register user api")
    void registerUser() throws InvalidTokenException, InvalidRequestBodyException {
        // Arrange
        Mockito.when(userService.findUserByEmail(userRequest.getEmail())).thenReturn(null);
        Mockito.when(userService.registerUser(userRequest)).thenReturn(user);
        Mockito.when(userService.generateVerificationToken()).thenReturn(new VerificationToken());

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);

        // Act
        String result = userServiceController.registerUser(userRequest, request);

        // Assert
        Mockito.verify(userService, Mockito.times(1)).findUserByEmail(userRequest.getEmail());
        Mockito.verify(userService, Mockito.times(1)).registerUser(userRequest);
        Mockito.verify(userService, Mockito.times(1)).generateVerificationToken();
        Mockito.verify(userService, Mockito.times(1)).saveVerificationTokenForUser(user, new VerificationToken());

        assertEquals("User registered successfully", result);
    }

    @Test
    void resetPassword() {
    }

    @Test
    void savePassword() {
    }

    @Test
    void userDetails() {
    }

    @Test
    void exportIntoExcelFile() {
    }
}