package com.stackroute.ssiservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
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

	@Autowired
	MockMvc mockMvc;
	
	@Mock
	SsiDetailsService servie;
	
	@BeforeEach
	public void setup() throws Exception{
		MockitoAnnotations.openMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
	}

	@Test
	public void addSsiTest() throws Exception {
		String str = "2004-07-02"+" 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		SsiDetails details = new SsiDetails(0, "8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		SsiDataRequest requestData = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		when(servie.addSsi(requestData)).thenReturn(details);
		this.mockMvc.perform(post("/ssi/add").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(requestData))).andExpect(status().isCreated()).andDo(print());
	}
	
	@Test
	public void addSsiTestBadRequest() throws Exception {
		String str = "2004-07-02"+" 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		SsiDetails details = new SsiDetails(0, "", "product" ,"","INR", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		SsiDataRequest requestData = new SsiDataRequest("", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		when(servie.addSsi(requestData)).thenThrow(InvalidSsiEntry.class);
		this.mockMvc.perform(post("/ssi/add").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(requestData))).andExpect(status().isBadRequest()).andDo(print());
	}
	@Test
	public void deleteSsiTest() throws Exception {
		String str = "2004-07-02"+" 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		SsiDetails details = new SsiDetails(0, "8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		//SsiDataRequest requestData = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		when(servie.deleteSsi(0)).thenReturn(details);
		this.mockMvc.perform(delete("/ssi/0").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andDo(print());
	}
	@Test
	public void deleteSsiTestBadRequest() throws Exception {
		String str = "2004-07-02"+" 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		SsiDetails details = new SsiDetails(0, "8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		//SsiDataRequest requestData = new SsiDataRequest("8124123456789876543456789767", "product" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		when(servie.deleteSsi(0)).thenThrow(SsiNotFoundException.class);
		this.mockMvc.perform(delete("/ssi/0").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isBadRequest()).andDo(print());
	}
	@Test
	public void updateSsiTest() throws Exception{
		String str = "2004-07-02"+" 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		SsiDetails details = new SsiDetails(0, "8124123456789876543456789767", "unknown" ,"","INR", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		SsiDataRequest requestData = new SsiDataRequest("8124123456789876543456789767", "unknown" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		when(servie.updateSsi(requestData, 0)).thenReturn(details);
		this.mockMvc.perform(patch("/ssi/0").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(requestData))).andExpect(status().isCreated()).andDo(print());
	}
	@Test
	public void updateSsiTestBadRequest() throws Exception{
		String str = "2004-07-02"+" 00:00";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
		SsiDetails details = new SsiDetails(0, "8124123456789876543456789767", "unknown" ,"","INR", "product", "assetclass1", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED","","","","","","", null, 0, false, false, false, null, dateTime, null, null, null, null);
		SsiDataRequest requestData = new SsiDataRequest("8124123456789876543456789767", "unknown" ,"","INR", "product", "assetclass1", "2004-07-02", "", "", "", "", "KILIMANJARO", "", "DASH BANK", "123AED", "", "", "", "", "", "");
		when(servie.updateSsi(requestData, 0)).thenThrow(InvalidSsiEntry.class);
		this.mockMvc.perform(patch("/ssi/0").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(requestData))).andExpect(status().isBadRequest()).andDo(print());
	}
	
	
	
	

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