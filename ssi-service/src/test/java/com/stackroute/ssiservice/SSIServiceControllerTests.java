package com.stackroute.ssiservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.stackroute.ssiservice.controller.SsiDetailsController;
import com.stackroute.ssiservice.dto.SsiDataRequest;
import com.stackroute.ssiservice.exceptions.InvalidSsiEntry;
import com.stackroute.ssiservice.exceptions.SsiNotFoundException;
import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.repository.SsiDetailsRepository;
import com.stackroute.ssiservice.service.SsiDetailsService;

@ExtendWith(MockitoExtension.class)
public class SSIServiceControllerTests {
	@InjectMocks
	SsiDetailsController controller;

	@Mock
	SsiDetailsRepository repository;

	@Mock
	SsiDetailsService servie;

//	@Test
//	public void addSsiTest() throws InvalidSsiEntry {
//		MockHttpServletRequest request = new MockHttpServletRequest();
//		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
//		lenient().when(repository.save(any(SsiDetails.class))).thenReturn(any(SsiDetails.class));
//		String str = "2004-07-02"+" 00:00";
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
//		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
//		SsiDetails details = new SsiDetails(0, "8124123456789876543456789767", "Unknown" ,"","USD", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
//		SsiDataRequest requestData = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
//		//lenient().when(servie.addSsi(any(SsiDataRequest.class))).thenReturn(any(SsiDetails.class));
//		String response = controller.addNewSsi(requestData, request);
//		assertThat(response).isEqualTo("SSI added");
//	}
//
//	@Test
//	public void deleteSsiTest() throws SsiNotFoundException {
//		String response = controller.deleteSsi(0);
//		assertThat(response).isEqualTo("SSI deleted");
//
//	}
//
//	@Test
//	public void updateSsiTest() throws InvalidSsiEntry {
//		SsiDataRequest request = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
//		String response = controller.updateSsi(0, request);
//		assertThat(response).isEqualTo("SSI updated");
//	}
}