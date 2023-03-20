package com.stackroute.ssiservice.service;

import java.util.Optional;

import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.repository.SsiDetailsRepository;

public class SsiDetailsServiceImplementation implements SsiDetailsService{
	private SsiDetailsRepository ssiDetailRepository;

	@Override
	public void addSsi(SsiDetails ssiDetails) {
		ssiDetailRepository.save(ssiDetails);
	}

	@Override
	public SsiDetails deleteSsi(int ssiRefId) {
		Optional<SsiDetails> optionalSsi = ssiDetailRepository.findById(ssiRefId);
		SsiDetails ssiDetails = optionalSsi.isEmpty()?null:optionalSsi.get();
		if (ssiDetails==null) {
			return null;
		}
		ssiDetailRepository.deleteById(ssiRefId);
		return ssiDetails;
	}

	@Override
	public SsiDetails updateSsi(SsiDetails newSsiDetails) {
		Optional<SsiDetails> optionalSsi = ssiDetailRepository.findById(newSsiDetails.getSsiRefId());
		SsiDetails ssiDetails = optionalSsi.isEmpty()?null:optionalSsi.get();
		if (ssiDetails==null) {
			return null;
		}
		ssiDetails = newSsiDetails;
		return ssiDetails;
	}

	@Override
	public SsiDetails searchById(int ssiRefId) {
		Optional<SsiDetails> optionalSsi = ssiDetailRepository.findById(ssiRefId);
		SsiDetails ssiDetails = optionalSsi.isEmpty()?null:optionalSsi.get();
		if (ssiDetails==null) {
			return null;
		}
		return ssiDetails;
	}
	
}
