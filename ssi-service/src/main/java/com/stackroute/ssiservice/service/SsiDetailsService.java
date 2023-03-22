package com.stackroute.ssiservice.service;

import java.util.List;

import com.stackroute.ssiservice.dto.SsiDataRequest;
import com.stackroute.ssiservice.exceptions.SsiNotFoundException;
import com.stackroute.ssiservice.model.SsiDetails;

public interface SsiDetailsService {
	public SsiDetails addSsi(SsiDataRequest ssiDetails);

	public SsiDetails deleteSsi(int ssiRefId) throws SsiNotFoundException;

	public SsiDetails updateSsi(SsiDataRequest ssiDataRequest, int id);

	public SsiDetails searchById(int ssiRefId) throws SsiNotFoundException;
	
	public List<SsiDetails> searchByAccountName(String accountName);
	
	public List<SsiDetails> searchByAccountNumber(String accountNumber);
	
	public List<SsiDetails> searchByCurrency(String currency);
	
	public List<SsiDetails> searchByCountry(String country);
	
	public List<SsiDetails> searchByAssetClass(String assetClass);
	
	public List<SsiDetails> searchByProduct(String product);
	
	public List<SsiDetails> searchByRoutingCode(String routingCode);

}
