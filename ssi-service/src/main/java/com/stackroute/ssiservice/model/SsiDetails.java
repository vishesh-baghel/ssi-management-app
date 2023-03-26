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
	
	
	private String intermediary1AccountNumber;	//rename it in the form intermediary1AccountNumber
	private String intermediary1BankBic;
	private String intermediary2AccountNumber;
	private String intermediary2BankBic;
	private String intermediary1AccountName;
	private String intermediary2AccountName;
	
	private String description;				//generate at backend
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

	public int getSsiRefId() {
		return ssiRefId;
	}

	public void setSsiRefId(int ssiRefId) {
		this.ssiRefId = ssiRefId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public int getEntityRefId() {
		return entityRefId;
	}

	public void setEntityRefId(int entityRefId) {
		this.entityRefId = entityRefId;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAssetClass() {
		return assetClass;
	}

	public void setAssetClass(String assetClass) {
		this.assetClass = assetClass;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public String getRoutingCode() {
		return routingCode;
	}

	public void setRoutingCode(String routingCode) {
		this.routingCode = routingCode;
	}

	public String getCorrespondanceBankName() {
		return correspondanceBankName;
	}

	public void setCorrespondanceBankName(String correspondanceBankName) {
		this.correspondanceBankName = correspondanceBankName;
	}

	public String getCorrespondanceBankBic() {
		return correspondanceBankBic;
	}

	public void setCorrespondanceBankBic(String correspondanceBankBic) {
		this.correspondanceBankBic = correspondanceBankBic;
	}

	public String getBeneficiaryBankName() {
		return beneficiaryBankName;
	}

	public void setBeneficiaryBankName(String beneficiaryBankName) {
		this.beneficiaryBankName = beneficiaryBankName;
	}

	public String getBeneficiaryBankBic() {
		return beneficiaryBankBic;
	}

	public void setBeneficiaryBankBic(String beneficiaryBankBic) {
		this.beneficiaryBankBic = beneficiaryBankBic;
	}

	public String getCorrespondanceAccountNumber() {
		return correspondanceAccountNumber;
	}

	public void setCorrespondanceAccountNumber(String correspondanceAccountNumber) {
		this.correspondanceAccountNumber = correspondanceAccountNumber;
	}

	public String getCorrespondanceAccountName() {
		return correspondanceAccountName;
	}

	public void setCorrespondanceAccountName(String correspondanceAccountName) {
		this.correspondanceAccountName = correspondanceAccountName;
	}

	public String getIntermediary1AccountNumber() {
		return intermediary1AccountNumber;
	}

	public void setIntermediary1AccountNumber(String intermediary1AccountNumber) {
		this.intermediary1AccountNumber = intermediary1AccountNumber;
	}

	public String getIntermediary1BankBic() {
		return intermediary1BankBic;
	}

	public void setIntermediary1BankBic(String intermediary1BankBic) {
		this.intermediary1BankBic = intermediary1BankBic;
	}

	public String getIntermediary2AccountNumber() {
		return intermediary2AccountNumber;
	}

	public void setIntermediary2AccountNumber(String intermediary2AccountNumber) {
		this.intermediary2AccountNumber = intermediary2AccountNumber;
	}

	public String getIntermediary2BankBic() {
		return intermediary2BankBic;
	}

	public void setIntermediary2BankBic(String intermediary2BankBic) {
		this.intermediary2BankBic = intermediary2BankBic;
	}

	public String getIntermediary1AccountName() {
		return intermediary1AccountName;
	}

	public void setIntermediary1AccountName(String intermediary1AccountName) {
		this.intermediary1AccountName = intermediary1AccountName;
	}

	public String getIntermediary2AccountName() {
		return intermediary2AccountName;
	}

	public void setIntermediary2AccountName(String intermediary2AccountName) {
		this.intermediary2AccountName = intermediary2AccountName;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public boolean isPrimary() {
		return isPrimary;
	}

	public void setPrimary(boolean isPrimary) {
		this.isPrimary = isPrimary;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

	public LocalDateTime getEffectiveDate() {
		return effectiveDate;
	}

	public void setEffectiveDate(LocalDateTime effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	public LocalDateTime getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDateTime expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getApprovedTs() {
		return approvedTs;
	}

	public void setApprovedTs(String approvedTs) {
		this.approvedTs = approvedTs;
	}

	public String getApprovedBy() {
		return approvedBy;
	}

	public void setApprovedBy(String approvedBy) {
		this.approvedBy = approvedBy;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

}
