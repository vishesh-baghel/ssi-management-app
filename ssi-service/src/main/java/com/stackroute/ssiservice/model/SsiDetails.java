package com.stackroute.ssiservice.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SsiDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ssiRefId;	

	private String accountNumber;
	private String accountName;
	private String accountType;
	private String currency;
	private String product;
	private String assetClass;
	private String country;
	private String routingCode;
	private String correspondanceAccountNumber;
	private String correspondanceAccountName;
	private String correspondanceBankName;
	private String correspondanceBankBic;
	private String beneficiaryBankName;
	private String beneficiaryBankBic;
	
	
	private String intermediary1AccountNumber;	
	private String intermediary1BankBic;
	private String intermediary2AccountNumber;
	private String intermediary2BankBic;
	private String intermediary1AccountName;
	private String intermediary2AccountName;
	
	private String description;				
	private int entityRefId;
	private boolean isActive;
	private boolean isPrimary;
	private boolean isApproved;
	private LocalDateTime effectiveDate;
	private LocalDateTime expiryDate;
	private String approvedTs;
	private String approvedBy;
	private String createdBy;
	private String updatedBy;


}
