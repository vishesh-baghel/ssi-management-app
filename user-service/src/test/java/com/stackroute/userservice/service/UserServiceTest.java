package com.stackroute.userservice.service;

import com.stackroute.userservice.dto.UserRequest;
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
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

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
        when(userRepository.save(user)).thenReturn(user);
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
    void saveVerificationTokenForUser_shouldThrowUserNotFoundException_whenUserIsNull() {
        VerificationToken token = new VerificationToken(new User(), "token");
        assertThrows(UserNotFoundException.class, () -> userService.saveVerificationTokenForUser(null, token));
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
    @DisplayName("test for findUserByEmail method with invalid email")
    void givenInvalidEmail_thenShouldThrowUserNotFoundException() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(null);
        assertThrows(UserNotFoundException.class, () -> userService.findUserByEmail(user.getEmail()));
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
    void findUserByUserName() {
    }

    @Test
    void createUserResponse() {
    }

    @Test
    void findAllUsersByCompanyName() {
    }

    @Test
    void createUserResponseList() {
    }

    @Test
    void findAllUsersByRole() {
    }

    @Test
    void updateUser() {
    }

    @Test
    void deleteUser() {
    }
}