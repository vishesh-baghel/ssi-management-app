package com.stackroute.ssiservice.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.ssiservice.dto.SsiDataRequest;
import com.stackroute.ssiservice.dto.SsiSearchResponse;
import com.stackroute.ssiservice.exceptions.SsiNotFoundException;
import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.repository.SsiDetailsRepository;

@Service
public class SsiDetailsServiceImplementation implements SsiDetailsService {
	@Autowired
	private SsiDetailsRepository ssiDetailRepository;

	@Override
	public SsiDetails addSsi(SsiDataRequest ssiDataRequest) {
		String str = ssiDataRequest.getExpiryDate() + " 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);

		SsiDetails ssiDetails = SsiDetails.builder().accountName(ssiDataRequest.getAccountName())
				.accountNumber(ssiDataRequest.getAccountNumber()).accountType(ssiDataRequest.getAcccountType())
				.currency(ssiDataRequest.getCurrency()).product(ssiDataRequest.getProduct())
				.assetClass(ssiDataRequest.getAssetClass()).country(ssiDataRequest.getCountry())
				.routingCode(ssiDataRequest.getRoutingCode())
				.correspondanceAccountName(ssiDataRequest.getCorrespondanceAccountName())
				.correspondanceAccountNumber(ssiDataRequest.getCorrespondanceAccountNumber())
				.correspondanceBankName(ssiDataRequest.getCorrespondanceBankName())
				.correspondanceBankBic(ssiDataRequest.getCorrespondanceBankBic())
				.beneficiaryBankName(ssiDataRequest.getBeneficiaryBankName())
				.beneficiaryBankBic(ssiDataRequest.getBeneficiaryBankBic())
				.intermediary1AccountName(ssiDataRequest.getIntermediary1AccountName())
				.intermediary1AccountNumber(ssiDataRequest.getIntermediary1AccountNumber())
				.intermediary1BankBic(ssiDataRequest.getIntermediary1BankBic())
				.intermediary2AccountName(ssiDataRequest.getIntermediary2AccountName())
				.intermediary2AccountNumber(ssiDataRequest.getIntermediary2AccountNumber())
				.intermediary2BankBic(ssiDataRequest.getIntermediary2BankBic()).description(null).entityRefId(0)
				.isActive(false).isPrimary(false).isApproved(false).approvedTs(null).approvedBy(null).createdBy(null)
				.updatedBy(null).effectiveDate(LocalDateTime.now()).expiryDate(dateTime).build();
		return ssiDetailRepository.save(ssiDetails);
	}

	@Override
	public SsiDetails deleteSsi(int ssiRefId) throws SsiNotFoundException {
		Optional<SsiDetails> optionalSsi = ssiDetailRepository.findById(ssiRefId);
		SsiDetails ssiDetails = optionalSsi.isEmpty() ? null : optionalSsi.get();
		if (ssiDetails == null) {
			throw new SsiNotFoundException("Ssi Not Found");
		}
		ssiDetailRepository.deleteById(ssiRefId);
		return ssiDetails;
	}

	@Override
	public SsiDetails updateSsi(SsiDataRequest newSsiDetails, int id) {
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
	public SsiDetails searchById(int ssiRefId) throws SsiNotFoundException {
		Optional<SsiDetails> optionalSsi = ssiDetailRepository.findById(ssiRefId);
		SsiDetails ssiDetails = optionalSsi.isEmpty() ? null : optionalSsi.get();
		if (ssiDetails == null) {
			throw new SsiNotFoundException("Ssi Not found");
		}
		return ssiDetails;
	}

	@Override
	public List<SsiDetails> searchByAccountName(String accountName) {
		List<SsiDetails> ssiList = ssiDetailRepository.findByAccountName(accountName);
		return ssiList;
	}

	@Override
	public List<SsiDetails> searchByAccountNumber(String accountNumber) {
		List<SsiDetails> ssiList = ssiDetailRepository.findByAccountNumber(accountNumber);
		return ssiList;
	}

	@Override
	public List<SsiDetails> searchByCurrency(String currency) {
		List<SsiDetails> ssiList = ssiDetailRepository.findByCurrency(currency);
		return ssiList;
	}

	@Override
	public List<SsiDetails> searchByCountry(String country) {
		List<SsiDetails> ssiList = ssiDetailRepository.findByCountry(country);
		return ssiList;
	}

	@Override
	public List<SsiDetails> searchByAssetClass(String assetClass) {
		List<SsiDetails> ssiList = ssiDetailRepository.findByAssetClass(assetClass);
		return ssiList;
	}

	@Override
	public List<SsiDetails> searchByProduct(String product) {
		List<SsiDetails> ssiList = ssiDetailRepository.findByProduct(product);
		return ssiList;
	}

	@Override
	public List<SsiDetails> searchByRoutingCode(String routingCode) {
		List<SsiDetails> ssiList = ssiDetailRepository.findByRoutingCode(routingCode);
		return ssiList;
	}

	@Override
	public SsiSearchResponse createSearchResponse(List<SsiDetails> ssiDetails, Long offset, Long count) {
		return new SsiSearchResponse().builder().status(200).message("Ssi Response").results(ssiDetails).offset(offset).count(count).total((long)ssiDetails.size()).build();
	}
	

}
