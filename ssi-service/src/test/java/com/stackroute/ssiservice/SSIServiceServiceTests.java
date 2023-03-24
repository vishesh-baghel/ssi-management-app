package com.stackroute.ssiservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.ssiservice.dto.SsiDataRequest;
import com.stackroute.ssiservice.exceptions.InvalidSsiEntry;
import com.stackroute.ssiservice.exceptions.SsiNotFoundException;
import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.repository.SsiDetailsRepository;
import com.stackroute.ssiservice.service.SsiDetailsService;
import com.stackroute.ssiservice.service.SsiDetailsServiceImplementation;


@RunWith(SpringRunner.class)
@SpringBootTest
class SSIServiceServiceTests {
	//@Autowired
	
	@Mock
	private SsiDetailsRepository repository;
	
	@InjectMocks
	private SsiDetailsServiceImplementation service;
	
	@BeforeEach
	public void setUp() throws Exception{
		MockitoAnnotations.openMocks(this);
		
	}
	@AfterEach
	public void tearDown() {
		
	}
	
	
	@Test
	public void addSsiTestWithValidData() throws InvalidSsiEntry {
		
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
        String str = request.getExpiryDate() + " 00:00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		SsiDetails details = new SsiDetails(0, "8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		when(repository.save(details)).thenReturn(details);
		SsiDetails response = service.addSsi(request);
		response.setSsiRefId(details.getSsiRefId());
		assertEquals(details, response);
	}
	@Test
	public void addSsiTestWithMissingAccountNumber() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.addSsi(request));
	}
	@Test
	public void addSsiTestWithMissingCurrency() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.addSsi(request));
	}
	@Test
	public void addSsiTestWithMissingProduct() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.addSsi(request));
	}
	@Test
	public void addSsiTestWithMissingAssertClass() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.addSsi(request));
	}
	@Test
	public void addSsiTestWithMissingExpiryDate() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.addSsi(request));
	}
	@Test
	public void addSsiTestWithMissingBeneBankName() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.addSsi(request));
	}
	@Test
	public void addSsiTestWithMissingBeneBankBic() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.addSsi(request));
	}
	@Test
	public void addSsiTestWithMissingCorresBankBic() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "", "", "DASH BANK", "", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.addSsi(request));
	}
	
	@Test
	public void updateSsiTestWithValidData() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "Unknown" ,"","USD", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
        String str = request.getExpiryDate() + " 00:00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
        SsiDetails details = new SsiDetails(0, "8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		SsiDetails result = new SsiDetails(0, "8124123456789876543456789767", "Unknown" ,"","USD", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		when(repository.findById(anyInt())).thenReturn(Optional.of(details));
		when(repository.save(result)).thenReturn(result);
		assertEquals(result, service.updateSsi(request, 0));
		
	}
	@Test
	public void updateSsiTestWithMissingAccountNumber() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.updateSsi(request,0));
	}
	@Test
	public void updateSsiTestWithMissingCurrency() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.updateSsi(request,0));
	}
	@Test
	public void updateSsiTestWithMissingProduct() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.updateSsi(request,0));
	}
	@Test
	public void updateSsiTestWithMissingAssertClass() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.updateSsi(request,0));
	}
	@Test
	public void updateSsiTestWithMissingExpiryDate() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.updateSsi(request,0));
	}
	@Test
	public void updateSsiTestWithMissingBeneBankName() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "", "123AED", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.updateSsi(request,0));
	}
	@Test
	public void updateSsiTestWithMissingBeneBankBic() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "", "", "DASH BANK", "", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.updateSsi(request,0));
	}
	@Test
	public void updateSsiTestWithMissingCorresBankBic() throws InvalidSsiEntry {
		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "", "", "DASH BANK", "", "", "", "", "", "", "");
		assertThrows(InvalidSsiEntry.class, ()->service.updateSsi(request,0));
	}
	@Test
	public void deleteSsiTest() throws SsiNotFoundException {
		String str = "2004-07-02"+" 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		SsiDetails details = new SsiDetails(0, "8124123456789876543456789767", "Unknown" ,"","USD", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		when(repository.findById(0)).thenReturn(Optional.of(details));
		assertEquals(details, service.deleteSsi(0));
	}
	@Test
	public void deleteSsiTestWhenNotFound() throws SsiNotFoundException {
		String str = "2004-07-02"+" 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		SsiDetails details = new SsiDetails(0, "8124123456789876543456789767", "Unknown" ,"","USD", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		when(repository.findById(0)).thenReturn(Optional.empty());
		assertThrows(SsiNotFoundException.class, ()->service.deleteSsi(0));
	}
}

