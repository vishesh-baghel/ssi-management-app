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
	public SsiDetails updateSsi(SsiRequest newSsiDetails, int id) {
		Optional<SsiDetails> optionalSsi = ssiDetailRepository.findById(id);
		SsiDetails ssiDetails = optionalSsi.isEmpty() ? null : optionalSsi.get();
		if (ssiDetails == null) {
			return null;
		}
		String str = newSsiDetails.getExpiryDate() + " 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		ssiDetails.setAccountName(newSsiDetails.getAccountName());
		ssiDetails.setAccountNumber(newSsiDetails.getAccountNumber());
		ssiDetails.setAccountType(newSsiDetails.getAcccountType());
		ssiDetails.setCurrency(newSsiDetails.getCurrency());
		ssiDetails.setProduct(newSsiDetails.getProduct());
		ssiDetails.setAssetClass(newSsiDetails.getAssetClass());
		ssiDetails.setCountry(newSsiDetails.getCountry());
		ssiDetails.setRoutingCode(newSsiDetails.getRoutingCode());
		ssiDetails.setCorrespondanceAccountName(newSsiDetails.getCorrespondanceAccountName());
		ssiDetails.setCorrespondanceAccountNumber(newSsiDetails.getCorrespondanceAccountNumber());
		ssiDetails.setCorrespondanceBankBic(newSsiDetails.getCorrespondanceBankBic());
		ssiDetails.setCorrespondanceBankName(newSsiDetails.getCorrespondanceBankName());
		ssiDetails.setBeneficiaryBankBic(newSsiDetails.getBeneficiaryBankBic());
		ssiDetails.setBeneficiaryBankName(newSsiDetails.getBeneficiaryBankName());
		ssiDetails.setIntermediary1AccountName(newSsiDetails.getIntermediary1AccountName());
		ssiDetails.setIntermediary1AccountNumber(newSsiDetails.getIntermediary1AccountNumber());
		ssiDetails.setIntermediary1BankBic(newSsiDetails.getIntermediary1BankBic());
		ssiDetails.setIntermediary2AccountName(newSsiDetails.getIntermediary2AccountName());
		ssiDetails.setIntermediary2AccountNumber(newSsiDetails.getIntermediary2AccountNumber());
		ssiDetails.setIntermediary2BankBic(newSsiDetails.getIntermediary2BankBic());
		ssiDetails.setExpiryDate(dateTime);
		ssiDetailRepository.save(ssiDetails);
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
