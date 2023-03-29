package com.stackroute.userservice.repository;

import com.stackroute.userservice.entity.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User user;

//    @BeforeEach
//    void setUp() {
//        user = User.builder()
//                .userName("test")
//                .password("test")
//                .email("test@gmail.com")
//                .companyName("test")
//                .build();
//    }
//
//    @AfterEach
//    void tearDown() {
//        userRepository.deleteAll();
//    }
//
//    @Test
//    @DisplayName("Test to save user")
//    void saveUser() {
//        userRepository.save(user);
//        User fetchUser = userRepository.findByEmail(user.getEmail());
//        assertNotNull(fetchUser);
//        assertEquals(user.getEmail(), fetchUser.getEmail());
//    }
//
//    @Test
//    void findByUserName() {
//    }
//
//    @Test
//    void findAllByCompanyName() {
//    }
//
//    @Test
//    void findAllByRole() {
//    }
//
//    @Test
//    void deleteByEmail() {
//    }
}