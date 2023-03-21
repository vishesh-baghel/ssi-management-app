package com.stackroute.ssiservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stackroute.ssiservice.model.SsiDetails;

public interface SsiDetailsRepository extends JpaRepository<SsiDetails, Integer> {
}
