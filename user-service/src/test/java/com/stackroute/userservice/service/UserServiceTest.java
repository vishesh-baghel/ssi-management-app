package com.stackroute.userservice.service;

import com.stackroute.userservice.dto.UserRequest;
import com.stackroute.userservice.dto.UserResponse;
import com.stackroute.userservice.entity.PasswordResetToken;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.entity.VerificationToken;
import com.stackroute.userservice.exceptions.InvalidTokenException;
import com.stackroute.userservice.exceptions.UserNotFoundException;
import com.stackroute.userservice.repository.PasswordResetTokenRepository;
import com.stackroute.userservice.repository.UserRepository;
import com.stackroute.userservice.repository.VerificationTokenRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static com.stackroute.userservice.service.UserServiceImpl.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.BDDAssertions.then;
import static org.assertj.core.api.InstanceOfAssertFactories.LIST;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private VerificationTokenRepository verificationTokenRepository;

    @Mock
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    private static UserRequest userRequest;
    private static User user;
    private static VerificationToken verificationToken;
    private static UserResponse userResponse;

    @BeforeEach
    public void setup() {
        userRequest = UserRequest.builder()
                .userName("user")
                .password("password")
                .email("user@email.com")
                .companyName("company")
                .role("role")
                .isAdmin(false)
                .build();


        user = User.builder()
                .userName(userRequest.getUserName())
                .password(userRequest.getPassword())
                .email(userRequest.getEmail())
                .companyName(userRequest.getCompanyName())
                .role(userRequest.getRole())
                .isAdmin(userRequest.getIsAdmin())
                .build();

        verificationToken = VerificationToken.builder()
                .token("token")
                .user(user)
                .build();
    }

    @AfterAll
    public static void tearDown() {
        userRequest = null;
        user = null;
        verificationToken = null;
    }

    @Test
    @DisplayName("test for registerUser method")
    void givenUserObject_whenSaveUser_thenReturnUserObject() {
        lenient().when(userRepository.save(user)).thenReturn(user);
        User savedUser = userService.registerUser(userRequest);
        assertThat(savedUser).isNotNull();
        then(savedUser).hasFieldOrPropertyWithValue("userName", user.getUserName());
        then(savedUser).hasFieldOrPropertyWithValue("email", user.getEmail());
        then(savedUser).hasFieldOrPropertyWithValue("companyName", user.getCompanyName());
        then(savedUser).hasFieldOrPropertyWithValue("role", user.getRole());
    }

    @Test
    @DisplayName("test for generateVerificationToken method")
    void shouldReturnVerificationTokenObjectOnInvocation() {
        lenient().when(verificationTokenRepository.save(verificationToken)).thenReturn(verificationToken);
        VerificationToken generatedToken = userService.generateVerificationToken();
        assertThat(generatedToken).isNotNull();
    }

    @Test
    @DisplayName("test for saveVerificationToken method with invalid token")
    void saveVerificationTokenForUser_shouldThrowInvalidTokenException_whenTokenIsNull() {
        User user = new User();
        user.setId(1L);
        assertThrows(InvalidTokenException.class, () -> userService.saveVerificationTokenForUser(user, null));
    }

    @Test
    @DisplayName("test for saveVerificationToken method with valid token")
    void givenValidToken_whenSaveVerificationToken_thenReturnVerificationTokenObject() throws UserNotFoundException, InvalidTokenException {
        lenient().when(verificationTokenRepository.save(verificationToken)).thenReturn(verificationToken);
        VerificationToken savedToken = userService.saveVerificationTokenForUser(user, verificationToken);
        assertThat(savedToken).isNotNull();
        then(savedToken).hasFieldOrPropertyWithValue("token", verificationToken.getToken());
        then(savedToken).hasFieldOrPropertyWithValue("user", verificationToken.getUser());
    }

    @Test
    @DisplayName("test for validateVerificationToken method with invalid token")
    void givenInvalidToken_thenLogInvalidTokenMessage() {
        String token = "InvalidToken";
        lenient().when(verificationTokenRepository.findByToken(token)).thenReturn(null);
        assertEquals("invalid Token", userService.validateVerificationToken(token));
    }

    @Test
    @DisplayName("test for validateVerificationToken method with valid token")
    void givenValidToken_whenValidateVerificationToken_thenReturnValidTokenMessage() {
        // Arrange
        String token = "validToken";
        VerificationToken verificationToken = new VerificationToken();
        User user = new User();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setExpirationTime(new Date(System.currentTimeMillis() + 3600 * 1000)); // expiration time after 1 hour
        when(verificationTokenRepository.findByToken(token)).thenReturn(verificationToken);
        // Act
        String result = userService.validateVerificationToken(token);
        // Assert
//        verify(userRepository, times(1)).save(user);
//        verify(verificationTokenRepository, times(1)).delete(verificationToken);
        assertEquals(TOKEN_VALID, result);
    }

    @Test
    @DisplayName("test for validateVerificationToken method with invalid token")
    void givenInvalidToken_whenValidateVerificationToken_thenReturnInvalidTokenMessage() {
        // Arrange
        String token = "invalidToken";
        when(verificationTokenRepository.findByToken(token)).thenReturn(null);
        // Act
        String result = userService.validateVerificationToken(token);
        // Assert
        assertEquals(INVALID_TOKEN, result);
    }

    @Test
    @DisplayName("test for validateVerificationToken method with expired token")
    void givenExpiredToken_whenValidateVerificationToken_thenDeleteTokenAndReturnExpiredTokenMessage() {
        // Arrange
        String token = "expiredToken";
        VerificationToken verificationToken = new VerificationToken();
        User user = new User();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setExpirationTime(new Date(System.currentTimeMillis() - 3600 * 1000)); // expiration time before 1 hour
        when(verificationTokenRepository.findByToken(token)).thenReturn(verificationToken);
        // Act
        String result = userService.validateVerificationToken(token);
        // Assert
        verify(verificationTokenRepository, times(1)).delete(verificationToken);
        assertEquals(TOKEN_EXPIRED, result);
    }

    @Test
    @DisplayName("test for findUserByEmail method with valid email")
    void givenValidEmail_thenShouldReturnUserObject() throws UserNotFoundException {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(user);
        User foundUser = userService.findUserByEmail(user.getEmail());
        assertNotNull(foundUser);
        assertEquals(user, foundUser);
    }

    @Test
    @DisplayName("test for createPasswordResetTokenForUser method with valid user")
    void givenValidUser_whenCreatePasswordResetTokenForUser_thenReturnPasswordResetTokenObject() throws UserNotFoundException, InvalidTokenException {
        String token = "token";
        PasswordResetToken expectedPasswordResetToken = new PasswordResetToken(user, token);
        userService.createPasswordResetTokenForUser(user, token);
        verify(passwordResetTokenRepository, times(1)).save(expectedPasswordResetToken);;
    }

    @Test
    @DisplayName("test for createPasswordResetTokenForUser method with null user")
    void testCreatePasswordResetTokenForUserWithNullUser() {
        String token = "token";
        assertThrows(UserNotFoundException.class, () -> userService.createPasswordResetTokenForUser(null, token));
    }

    @Test
    @DisplayName("test for createPasswordResetTokenForUser method with null token")
    void testCreatePasswordResetTokenForUserWithNullToken() {
        assertThrows(InvalidTokenException.class, () -> userService.createPasswordResetTokenForUser(user, null));
    }

    @Test
    @DisplayName("test for validatePasswordResetToken method with valid token")
    void givenValidToken_whenValidatePasswordResetToken_thenReturnValidTokenMessage() {
        // Arrange
        String token = "validToken";
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        User user = new User();
        passwordResetToken.setUser(user);
        passwordResetToken.setToken(token);
        passwordResetToken.setExpirationTime(new Date(System.currentTimeMillis() + 3600 * 1000)); // expiration time after 1 hour
        when(passwordResetTokenRepository.findByToken(token)).thenReturn(passwordResetToken);
        // Act
        String result = userService.validatePasswordResetToken(token);
        // Assert
        assertEquals(TOKEN_VALID, result);
    }

    @Test
    @DisplayName("test for validatePasswordResetToken method with invalid token")
    void givenInvalidToken_whenValidatePasswordResetToken_thenReturnInvalidTokenMessage() {
        // Arrange
        String token = "invalidToken";
        when(passwordResetTokenRepository.findByToken(token)).thenReturn(null);
        // Act
        String result = userService.validatePasswordResetToken(token);
        // Assert
        assertEquals(INVALID_TOKEN, result);
    }

    @Test
    @DisplayName("test for validatePasswordResetToken method with expired token")
    void givenExpiredToken_whenValidatePasswordResetToken_thenDeleteTokenAndReturnExpiredTokenMessage() {
        // Arrange
        String token = "expiredToken";
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        User user = new User();
        passwordResetToken.setUser(user);
        passwordResetToken.setToken(token);
        passwordResetToken.setExpirationTime(new Date(System.currentTimeMillis() - 3600 * 1000)); // expiration time before 1 hour
        when(passwordResetTokenRepository.findByToken(token)).thenReturn(passwordResetToken);
        // Act
        String result = userService.validatePasswordResetToken(token);
        // Assert
        verify(passwordResetTokenRepository, times(1)).delete(passwordResetToken);
        assertEquals(TOKEN_EXPIRED, result);
    }

    @Test
    @DisplayName("test for getUserByPasswordResetToken method with valid token")
    void givenValidToken_whenGetUserByPasswordResetToken_thenReturnOptionalObject() throws InvalidTokenException {
        // Arrange
        String token = "validToken";
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        User user = new User();
        passwordResetToken.setUser(user);
        passwordResetToken.setToken(token);
        passwordResetToken.setExpirationTime(new Date(System.currentTimeMillis() + 3600 * 1000)); // expiration time after 1 hour
        when(passwordResetTokenRepository.findByToken(token)).thenReturn(passwordResetToken);
        // Act
        Optional<User> result = userService.getUserByPasswordResetToken(token);
        // Assert
        assertTrue(result.isPresent());
        assertEquals(user, result.get());
    }

    @Test
    @DisplayName("test for getUserByPasswordResetToken method with invalid token")
    void givenNullToken_whenGetUserByPasswordResetToken_thenReturnThrowInvalidTokenException() {
        // Arrange
        String token = null;
        lenient().when(passwordResetTokenRepository.findByToken(token)).thenReturn(null);
        // Act
        assertThrows(InvalidTokenException.class, () -> userService.getUserByPasswordResetToken(token));
    }

    @Test
    @DisplayName("test for changePassword method with null user")
    void givenNullUser_whenChangePassword_thenReturnThrowUserNotFoundException() {
        // Arrange
        User user = null;
        // Act
        assertThrows(UserNotFoundException.class, () -> userService.changePassword(user, "password"));
    }

    @Test
    @DisplayName("test for changePassword method which change password successfully")
    void givenValidUser_whenChangePassword_thenReturnTrue() throws UserNotFoundException {
        // Arrange
        String password = "password";
        lenient().when(userRepository.findByEmail(user.getEmail())).thenReturn(user);
        // Act
        userService.changePassword(user, password);
        // Assert
        verify(userRepository, times(1)).save(user);
    }

    @Test
    @DisplayName("test for findUserByUserName method with valid username")
    void givenValidUsername_thenShouldReturnUserObject() throws UserNotFoundException {
        userService.registerUser(userRequest);
        when(userRepository.findByUserName(user.getUserName())).thenReturn(user);
        User foundUser = userService.findUserByUserName(user.getUserName());
        assertNotNull(foundUser);
        assertEquals(user, foundUser);
    }

    @Test
    @DisplayName("test for createUserResponse method with valid user, offset and limit")
    void givenValidUserAndOffsetAndLimit_whenCreateUserResponse_thenReturnUserResponseObject() throws UserNotFoundException {
        // Arrange
        int offset = 0;
        int count = 10;
        UserResponse expectedUserResponse = new UserResponse();
        expectedUserResponse.setOffset((long) offset);
        expectedUserResponse.setOffset((long) offset);
        expectedUserResponse.setCount((long) count);
        expectedUserResponse.setMessage("user details");
        expectedUserResponse.setStatus(200);
        expectedUserResponse.setResults(Collections.singletonList(user));
        // Act
        UserResponse result = userService.createUserResponse(user,offset, count);
        // Assert
        assertEquals(expectedUserResponse, result);
    }

    @Test
    @DisplayName("test for createUserResponse method with null user")
    void givenNullUser_whenCreateUserResponse_thenReturnThrowUserNotFoundException() {
        // Arrange
        int offset = 0;
        int count = 10;
        // Act
        assertThrows(UserNotFoundException.class, () -> userService.createUserResponse(null,offset, count));
    }

    @Test
    @DisplayName("test for findAllUsers method with invalid offset and limit")
    void givenInvalidOffsetAndLimit_whenFindAllUsers_thenReturnThrowInvalidOffsetAndLimitException() {
        // Arrange
        int offset = -1;
        int limit = -1;
        // Act
        assertThrows(IllegalArgumentException.class, () -> userService.createUserResponse(user, offset, limit));
    }

    @Test
    @DisplayName("test for findAllUsersByCompanyName method with valid company name")
    void givenValidCompanyName_whenFindAllUsersByCompanyName_thenReturnUserResponseObject() throws UserNotFoundException {
        // Arrange
        String companyName = "company";
        int offset = 0;
        int count = 10;
        String sortBy = "userName";
        String orderBy = "asc";
        userRepository.save(user);
        userService.registerUser(userRequest);
        lenient().when(userRepository.findAllByCompanyName(companyName, PageRequest.of(offset, count))).thenReturn(Collections.singletonList(user));
        // Act
        List<User> expectedUsers = userService.findAllUsersByCompanyName(companyName, offset, count, sortBy, orderBy);
        List<User> result = userService.findAllUsersByCompanyName(companyName, offset, count, sortBy, orderBy);
        // Assert
        assertThat(expectedUsers).isEqualTo(result);
    }

    @Test
    @DisplayName("test for findAllUsersByCompanyName method with invalid company name")
    void givenInvalidCompanyName_whenFindAllUsersByCompanyName_thenReturnThrowUserNotFoundException() {
        // Arrange
        String companyName = "company";
        int offset = 0;
        int count = 10;
        String sortBy = "userName";
        String orderBy = "asc";
        lenient().when(userRepository.findAllByCompanyName(companyName, PageRequest.of(offset, count))).thenReturn(null);
        // Act
        assertThrows(UserNotFoundException.class, () -> userService.findAllUsersByCompanyName(companyName, offset, count, sortBy, orderBy));
    }

    @Test
    @DisplayName("test for findAllUsersByRole method with valid role")
    void givenValidRole_whenFindAllUsersByRole_thenReturnUserResponseObject() throws UserNotFoundException {
        // Arrange
        String role = "role";
        int offset = 0;
        int count = 10;
        String sortBy = "userName";
        String orderBy = "asc";
        userRepository.save(user);
        UserResponse expectedUserResponse = new UserResponse();
        expectedUserResponse.setOffset((long) offset);
        expectedUserResponse.setOffset((long) offset);
        expectedUserResponse.setCount((long) count);
        expectedUserResponse.setMessage("user details");
        expectedUserResponse.setStatus(200);
        expectedUserResponse.setResults(Collections.singletonList(user));
        lenient().when(userRepository.findAllByRole(role, PageRequest.of(offset, count))).thenReturn(Collections.singletonList(user));
        // Act
        List<User> result = userService.findAllUsersByRole(role, offset, count, sortBy, orderBy);
        // Assert
        assertEquals(Collections.singletonList(user), result);
    }

    @Test
    @DisplayName("test for findAllUsersByRole method with invalid role")
    void givenInvalidRole_whenFindAllUsersByRole_thenReturnThrowUserNotFoundException() {
        // Arrange
        String role = "role";
        int offset = 0;
        int count = 10;
        String sortBy = "userName";
        String orderBy = "asc";
        lenient().when(userRepository.findAllByRole(role, PageRequest.of(offset, count))).thenReturn(null);
        // Act
        assertThrows(UserNotFoundException.class, () -> userService.findAllUsersByRole(role, offset, count, sortBy, orderBy));
    }

    @Test
    @DisplayName("test for createUserResponseList method with valid user list, offset and limit")
    void givenValidUserListAndOffsetAndLimit_whenCreateUserResponseList_thenReturnUserResponseObject() throws UserNotFoundException {
        // Arrange
        int offset = 0;
        int count = 10;
        List<User> userList = Collections.singletonList(user);
        UserResponse expectedUserResponse = new UserResponse();
        expectedUserResponse.setOffset((long) offset);
        expectedUserResponse.setOffset((long) offset);
        expectedUserResponse.setCount((long) count);
        expectedUserResponse.setTotal((long) userList.size());
        expectedUserResponse.setMessage("users working in the given company");
        expectedUserResponse.setStatus(200);
        expectedUserResponse.setResults(userList);
        // Act
        UserResponse result = userService.createUserResponseList(userList, offset, count, null);
        // Assert
        assertEquals(expectedUserResponse, result);
    }

    @Test
    @DisplayName("test for createUserResponseList method with null user list")
    void givenNullUserList_whenCreateUserResponseList_thenReturnThrowIllegalArgumentsException() {
        // Arrange
        int offset = 0;
        int count = 10;
        // Act
        assertThrows(NullPointerException.class, () -> userService.createUserResponseList(null,offset, count, null));
    }

    @Test
    @DisplayName("test for createUserResponseList method with invalid offset and limit")
    void givenInvalidOffsetAndLimit_whenCreateUserResponseList_thenReturnThrowIllegalArgumentsException() {
        // Arrange
        int offset = -1;
        int count = -1;
        // Act
        assertThrows(IllegalArgumentException.class, () -> userService.createUserResponseList(Collections.singletonList(user),offset, count, null));
    }

    @Test
    @DisplayName("test for updateUser method with valid user")
    void givenValidUser_whenUpdateUser_thenReturnUserResponseObject() throws UserNotFoundException {
        // Arrange
        String result = userService.updateUser(user, true);
        // Assert
        assertEquals("user updated successfully", result);
    }

    @Test
    @DisplayName("test for updateUser method with null user")
    void givenNullUser_whenUpdateUser_thenReturnThrowUserNotFoundException() {
        assertThrows(NullPointerException.class, () -> userService.updateUser(null, true));
    }

    @Test
    @DisplayName("test for deleteUser method with valid user")
    void givenValidUser_whenDeleteUser_thenReturnUserResponseObject() throws UserNotFoundException, InvalidTokenException {
        // Arrange
        userService.registerUser(userRequest);
        VerificationToken token = userService.generateVerificationToken();
        userService.saveVerificationTokenForUser(user, token);
        verificationTokenRepository.save(token);
        // Act
        String result = userService.deleteUser(user);
        // Assert
        assertEquals("user deleted successfully", result);
    }

    @Test
    @DisplayName("test for deleteUser method with null user")
    void givenNullUser_whenDeleteUser_thenReturnThrowUserNotFoundException() {
        assertThrows(NullPointerException.class, () -> userService.deleteUser(null));
    }
}