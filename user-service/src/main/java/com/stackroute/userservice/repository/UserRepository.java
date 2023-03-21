package com.stackroute.userservice.repository;

import com.stackroute.userservice.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByUserName(String userName);

    List<User> findAllByCompanyName(String companyName, Pageable pageable);

    List<User> findAllByRole(String role, Pageable pageable);

}
