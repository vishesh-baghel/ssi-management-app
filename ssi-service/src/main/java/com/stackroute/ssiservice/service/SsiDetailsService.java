package com.stackroute.ssiservice.service;

import com.stackroute.ssiservice.dto.SsiRequest;
import com.stackroute.ssiservice.model.SsiDetails;

public interface SsiDetailsService {
	public void addSsi(SsiRequest ssiDetails);

	public SsiDetails deleteSsi(int ssiRefId);

	public SsiDetails updateSsi(SsiRequest ssiRequest, int id);

	public SsiDetails searchById(int ssiRefId);

}
