package com.stackroute.userservice.repository;

import com.stackroute.userservice.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    void deleteByUserId(Long id);
    VerificationToken findByToken(String token);
}
