package com.stackroute.ssiservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SsiDataRequest {
	private String accountNumber;
	private String accountName;
	private String acccountType;
	private String currency;
	private String product;
	private String assetClass;
	private String expiryDate;
	private String country;
	private String routingCode;
	private String correspondanceAccountNumber;
	private String correspondanceAccountName;
	private String correspondanceBankName;
	private String correspondanceBankBic;
	private String beneficiaryBankName;
	private String beneficiaryBankBic;
	private String intermediary1AccountNumber;
	private String intermediary1AccountName;
	private String intermediary1BankBic;
	private String intermediary2AccountNumber;
	private String intermediary2AccountName;
	private String intermediary2BankBic;
}
