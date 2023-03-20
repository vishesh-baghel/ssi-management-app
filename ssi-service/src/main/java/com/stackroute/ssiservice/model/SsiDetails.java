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
	private String description;
	private String product;
	private int entityRefId;
	private String currency;
	private String country;
	private String assetClass;
	private String accountNumber;
	private String accountName;
	private String accountType;
	private String routingCode;
	private String correspondentBankName;
	private String correspondentBankBic;
	private String beneficiaryBankName;
	private String beneficiaryBankBic;
	private String correspondentAccountNumber;
	private String correspondentAccountName;
	private String intermediaryAccountNo1;
	private String intermediaryBankBic1;
	private String intermediaryAccountNo2;
	private String intermediaryBankBic2;
	private String intermediaryAccountName1;
	private String intermediaryAccountName2;
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
	public String getCorrespondentBankName() {
		return correspondentBankName;
	}
	public void setCorrespondentBankName(String correspondentBankName) {
		this.correspondentBankName = correspondentBankName;
	}
	public String getCorrespondentBankBic() {
		return correspondentBankBic;
	}
	public void setCorrespondentBankBic(String correspondentBankBic) {
		this.correspondentBankBic = correspondentBankBic;
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
	public String getCorrespondentAccountNumber() {
		return correspondentAccountNumber;
	}
	public void setCorrespondentAccountNumber(String correspondentAccountNumber) {
		this.correspondentAccountNumber = correspondentAccountNumber;
	}
	public String getCorrespondentAccountName() {
		return correspondentAccountName;
	}
	public void setCorrespondentAccountName(String correspondentAccountName) {
		this.correspondentAccountName = correspondentAccountName;
	}
	public String getIntermediaryAccountNo1() {
		return intermediaryAccountNo1;
	}
	public void setIntermediaryAccountNo1(String intermediaryAccountNo1) {
		this.intermediaryAccountNo1 = intermediaryAccountNo1;
	}
	public String getIntermediaryBankBic1() {
		return intermediaryBankBic1;
	}
	public void setIntermediaryBankBic1(String intermediaryBankBic1) {
		this.intermediaryBankBic1 = intermediaryBankBic1;
	}
	public String getIntermediaryAccountNo2() {
		return intermediaryAccountNo2;
	}
	public void setIntermediaryAccountNo2(String intermediaryAccountNo2) {
		this.intermediaryAccountNo2 = intermediaryAccountNo2;
	}
	public String getIntermediaryBankBic2() {
		return intermediaryBankBic2;
	}
	public void setIntermediaryBankBic2(String intermediaryBankBic2) {
		this.intermediaryBankBic2 = intermediaryBankBic2;
	}
	public String getIntermediaryAccountName1() {
		return intermediaryAccountName1;
	}
	public void setIntermediaryAccountName1(String intermediaryAccountName1) {
		this.intermediaryAccountName1 = intermediaryAccountName1;
	}
	public String getIntermediaryAccountName2() {
		return intermediaryAccountName2;
	}
	public void setIntermediaryAccountName2(String intermediaryAccountName2) {
		this.intermediaryAccountName2 = intermediaryAccountName2;
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
