package com.stackroute.ssiservice.service;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.stackroute.ssiservice.dto.Filter;
import com.stackroute.ssiservice.dto.SsiSearchRequest;
import com.stackroute.ssiservice.repository.SsiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.ssiservice.dto.SsiDataRequest;
import com.stackroute.ssiservice.dto.SsiSearchResponse;
import com.stackroute.ssiservice.exceptions.InvalidSsiEntry;
import com.stackroute.ssiservice.exceptions.SsiNotFoundException;
import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.repository.SsiDetailsRepository;
import org.springframework.util.ReflectionUtils;

@Service
public class SsiDetailsServiceImplementation implements SsiDetailsService {
    @Autowired
    private SsiDetailsRepository ssiDetailRepository;

    @Autowired
    private SsiRepository ssiRepository;

    @Override
    public SsiDetails addSsi(SsiDataRequest ssiDataRequest) throws InvalidSsiEntry {
    	if (ssiDataRequest.getExpiryDate().isBlank()) {
    		throw new InvalidSsiEntry("Invalid Expiry date");
    	}
        String str = ssiDataRequest.getExpiryDate() + " 00:00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
        
        String accountNumber = ssiDataRequest.getAccountNumber();
        String accountName = ssiDataRequest.getAccountName();
        String accountType = ssiDataRequest.getAcccountType();
        String currency = ssiDataRequest.getCurrency();
        String product = ssiDataRequest.getProduct();
        String assetClass = ssiDataRequest.getAssetClass();
        String expiryDate = ssiDataRequest.getExpiryDate();
        String country = ssiDataRequest.getCountry();
        String routingCode = ssiDataRequest.getRoutingCode();
        String correspondanceAccountNumber = ssiDataRequest.getCorrespondanceAccountNumber();
        String correspondanceAccountName = ssiDataRequest.getCorrespondanceAccountName();
        String correspondanceBankName = ssiDataRequest.getCorrespondanceBankName();
        String correspondanceBankBic = ssiDataRequest.getCorrespondanceBankBic();
        String beneficiaryBankName = ssiDataRequest.getBeneficiaryBankName();
        String beneficiaryBankBic = ssiDataRequest.getBeneficiaryBankBic();
        String intermediary1AccountNumber = ssiDataRequest.getIntermediary1AccountNumber();
        String intermediary1AccountName = ssiDataRequest.getIntermediary1AccountName();
        String intermediary1BankBic = ssiDataRequest.getIntermediary1BankBic();
        String intermediary2AccountNumber = ssiDataRequest.getIntermediary2AccountNumber();
        String intermediary2AccountName = ssiDataRequest.getIntermediary2AccountName();
        String intermediary2BankBic = ssiDataRequest.getIntermediary2BankBic();
        
        if (accountNumber.isBlank() || accountNumber.length()>30 || accountNumber.length()<10) {
        	throw new InvalidSsiEntry("Invalid accountNumber entry");
        }
        if (currency.isBlank()) {
        	throw new InvalidSsiEntry("Currency field should not be empty");
        }
        if (product.isBlank()) {
        	throw new InvalidSsiEntry("Product should not be empty");
        }
        if (assetClass.isBlank()) {
        	throw new InvalidSsiEntry("The AssetClass should not be empty");
        }
        if (expiryDate.isBlank()) {
        	throw new InvalidSsiEntry("Expiry date is mandatory");
        }
        if (beneficiaryBankName.isBlank()) {
        	throw new InvalidSsiEntry("The beneficiary bank name should not be empty");
        }
        if (correspondanceBankName.isBlank()) {
        	throw new InvalidSsiEntry("The correspondance bank name should not be empty");
        }
        if (beneficiaryBankBic.isBlank()) {
        	throw new InvalidSsiEntry("The Beneficiary bank bic should not be empty");
        }

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
                .updatedBy(null).effectiveDate(null).expiryDate(dateTime).build();
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
    public SsiDetails updateSsi(SsiDataRequest newSsiDetails, int id) throws InvalidSsiEntry {
    	
        String accountNumber = newSsiDetails.getAccountNumber();
        String accountName = newSsiDetails.getAccountName();
        String accountType = newSsiDetails.getAcccountType();
        String currency = newSsiDetails.getCurrency();
        String product = newSsiDetails.getProduct();
        String assetClass = newSsiDetails.getAssetClass();
        String expiryDate = newSsiDetails.getExpiryDate();
        String country = newSsiDetails.getCountry();
        String routingCode = newSsiDetails.getRoutingCode();
        String correspondanceAccountNumber = newSsiDetails.getCorrespondanceAccountNumber();
        String correspondanceAccountName = newSsiDetails.getCorrespondanceAccountName();
        String correspondanceBankName = newSsiDetails.getCorrespondanceBankName();
        String correspondanceBankBic = newSsiDetails.getCorrespondanceBankBic();
        String beneficiaryBankName = newSsiDetails.getBeneficiaryBankName();
        String beneficiaryBankBic = newSsiDetails.getBeneficiaryBankBic();
        String intermediary1AccountNumber = newSsiDetails.getIntermediary1AccountNumber();
        String intermediary1AccountName = newSsiDetails.getIntermediary1AccountName();
        String intermediary1BankBic = newSsiDetails.getIntermediary1BankBic();
        String intermediary2AccountNumber = newSsiDetails.getIntermediary2AccountNumber();
        String intermediary2AccountName = newSsiDetails.getIntermediary2AccountName();
        String intermediary2BankBic = newSsiDetails.getIntermediary2BankBic();
        
        if (accountNumber==null || accountNumber.length()>30 || accountNumber.length()<10) {
        	throw new InvalidSsiEntry("Invalid accountNumber entry");
        }
        if (currency.isBlank()) {
        	throw new InvalidSsiEntry("Currency field should not be empty");
        }
        if (product.isBlank()) {
        	throw new InvalidSsiEntry("Product should not be empty");
        }
        if (assetClass.isBlank()) {
        	throw new InvalidSsiEntry("The AssetClass should not be empty");
        }
        if (expiryDate.isBlank()) {
        	throw new InvalidSsiEntry("Expiry date is mandatory");
        }
        if (beneficiaryBankName.isBlank()) {
        	throw new InvalidSsiEntry("The beneficiary bank name should not be empty");
        }
        if (correspondanceBankName.isBlank()) {
        	throw new InvalidSsiEntry("The correspondance bank name should not be empty");
        }
        if (beneficiaryBankBic.isBlank()) {
        	throw new InvalidSsiEntry("The Beneficiary bank bic should not be empty");
        }
        
        Optional<SsiDetails> optionalSsi = ssiDetailRepository.findById(id);
        SsiDetails ssiDetails = optionalSsi.isEmpty() ? null : optionalSsi.get();
        if (ssiDetails == null) {
        	System.out.println("Is empty");
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
        System.out.println(ssiDetails);
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
        return new SsiSearchResponse().builder().status(200).message("Ssi Response").results(ssiDetails).offset(offset).count(count).total((long) ssiDetails.size()).build();
    }

    @Override
    public List<SsiDetails> search(SsiSearchRequest ssiSearchRequest) {
        List<SsiDetails> ssiList = ssiRepository.findBySearchParams(ssiSearchRequest);
        return ssiList;
    }


}
