package com.stackroute.userservice.repository;

import com.stackroute.userservice.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
     PasswordResetToken findByToken(String token);
}
