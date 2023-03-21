package com.stackroute.ssiservice.service;

import com.stackroute.ssiservice.model.SsiDetails;

public interface SsiDetailsService {
	public void addSsi(SsiDetails ssiDetails);
	public SsiDetails deleteSsi(int ssiRefId);
	public SsiDetails updateSsi(SsiDetails newSsiDetails);
	public SsiDetails searchById(int ssiRefId);
	
}
