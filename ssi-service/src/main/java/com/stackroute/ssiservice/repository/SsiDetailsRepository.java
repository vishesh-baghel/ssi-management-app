package com.stackroute.ssiservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stackroute.ssiservice.dto.SsiRequest;
import com.stackroute.ssiservice.model.SsiDetails;

public interface SsiDetailsRepository extends JpaRepository<SsiDetails, Integer> {

	void save(SsiRequest ssiDetails);
	
	List<SsiDetails> findByAccountNumber(String accountNumber);
	
	List<SsiDetails> findByAccountName(String accountName);
	
	List<SsiDetails> findByCurrency(String currency);
	
	List<SsiDetails> findByCountry(String country);
	
	List<SsiDetails> findByAssetClass(String assetClass);
	
	List<SsiDetails> findByProduct(String product);
	
	List<SsiDetails> findByRoutingCode(String routingCode);
}