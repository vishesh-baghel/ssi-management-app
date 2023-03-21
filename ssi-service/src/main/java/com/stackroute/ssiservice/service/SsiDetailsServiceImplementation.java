package com.stackroute.ssiservice.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.ssiservice.dto.SsiRequest;
import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.repository.SsiDetailsRepository;

@Service
public class SsiDetailsServiceImplementation implements SsiDetailsService {
	@Autowired
	private SsiDetailsRepository ssiDetailRepository;

	@Override
	public void addSsi(SsiRequest ssiRequest) {
		String str = ssiRequest.getExpiryDate() + " 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);

		SsiDetails ssiDetails = SsiDetails.builder().accountName(ssiRequest.getAccountName())
				.accountNumber(ssiRequest.getAccountNumber()).accountType(ssiRequest.getAcccountType())
				.currency(ssiRequest.getCurrency()).product(ssiRequest.getProduct())
				.assetClass(ssiRequest.getAssetClass()).country(ssiRequest.getCountry())
				.routingCode(ssiRequest.getRoutingCode())
				.correspondanceAccountName(ssiRequest.getCorrespondanceAccountName())
				.correspondanceAccountNumber(ssiRequest.getCorrespondanceAccountNumber())
				.correspondanceBankName(ssiRequest.getCorrespondanceBankName())
				.correspondanceBankBic(ssiRequest.getCorrespondanceBankBic())
				.beneficiaryBankName(ssiRequest.getBeneficiaryBankName())
				.beneficiaryBankBic(ssiRequest.getBeneficiaryBankBic())
				.intermediary1AccountName(ssiRequest.getIntermediary1AccountName())
				.intermediary1AccountNumber(ssiRequest.getIntermediary1AccountNumber())
				.intermediary1BankBic(ssiRequest.getIntermediary1BankBic())
				.intermediary2AccountName(ssiRequest.getIntermediary2AccountName())
				.intermediary2AccountNumber(ssiRequest.getIntermediary2AccountNumber())
				.intermediary2BankBic(ssiRequest.getIntermediary2BankBic()).description(null).entityRefId(0)
				.isActive(false).isPrimary(false).isApproved(false).approvedTs(null).approvedBy(null).createdBy(null)
				.updatedBy(null).effectiveDate(LocalDateTime.now()).expiryDate(dateTime).build();
		ssiDetailRepository.save(ssiDetails);
	}

	@Override
	public SsiDetails deleteSsi(int ssiRefId) {
		Optional<SsiDetails> optionalSsi = ssiDetailRepository.findById(ssiRefId);
		SsiDetails ssiDetails = optionalSsi.isEmpty() ? null : optionalSsi.get();
		if (ssiDetails == null) {
			return null;
		}
		ssiDetailRepository.deleteById(ssiRefId);
		return ssiDetails;
	}

	@Override
	public SsiDetails updateSsi(SsiDetails newSsiDetails) {
		Optional<SsiDetails> optionalSsi = ssiDetailRepository.findById(newSsiDetails.getSsiRefId());
		SsiDetails ssiDetails = optionalSsi.isEmpty() ? null : optionalSsi.get();
		if (ssiDetails == null) {
			return null;
		}
		ssiDetails = newSsiDetails;
		return ssiDetails;
	}

	@Override
	public SsiDetails searchById(int ssiRefId) {
		Optional<SsiDetails> optionalSsi = ssiDetailRepository.findById(ssiRefId);
		SsiDetails ssiDetails = optionalSsi.isEmpty() ? null : optionalSsi.get();
		if (ssiDetails == null) {
			return null;
		}
		return ssiDetails;
	}

}
