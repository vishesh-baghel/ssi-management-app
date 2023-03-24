package com.stackroute.ssiservice.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stackroute.ssiservice.dto.SsiDataRequest;
import com.stackroute.ssiservice.dto.SsiSearchRequest;
import com.stackroute.ssiservice.dto.SsiSearchResponse;
import com.stackroute.ssiservice.exceptions.InvalidSsiEntry;
import com.stackroute.ssiservice.exceptions.SsiNotFoundException;
import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.repository.SsiDetailsRepository;
import com.stackroute.ssiservice.service.SsiDetailsService;

import netscape.javascript.JSObject;

@RestController
@RequestMapping("/ssi")
public class SsiDetailsController {

	@Autowired
	private SsiDetailsService ssiDetailsService;

//	@GetMapping("/a")
//	public String home() {
//		return "ssi management";
//	}

	@PostMapping("/add")
	public String addNewSsi(@RequestBody SsiDataRequest ssiDataRequest, HttpServletRequest request) throws InvalidSsiEntry {
		SsiDetails data = ssiDetailsService.addSsi(ssiDataRequest);
		return "SSI added";
	}
	@DeleteMapping("/{ssiRefId}")
	public String deleteSsi(@PathVariable("ssiRefId") int id) throws SsiNotFoundException {
		ssiDetailsService.deleteSsi(id);
		return "SSI deleted";
	}
	@PatchMapping("/{id}")
	public String updateSsi(@PathVariable("id") int id, @RequestBody SsiDataRequest ssiDataRequest) throws InvalidSsiEntry {
		ssiDetailsService.updateSsi(ssiDataRequest, id);
		return "SSI updated";
	}
//	@GetMapping("/accountnumber/{accountNumber}")
//	public List<SsiDetails> getSsiByAccountNumber(@PathVariable("accountNumber") String accountNumber){
//		return ssiDetailsService.searchByAccountNumber(accountNumber);
//	}
	
	
	//Example of using search in Account Number

	// we get ssiSearchRequest in form :
	//	obj = {
	//			filter:[
	//				{
	//					column:columName,
	//					operator:eq,
	//					value:columValue
	//				},
	//				{
	//					column:columName,
	//					operator:btw,
	//					values:[date1,date2]
	//				},
	//			]
	//		  }
	//
	//
	//
	//
	//
	@PostMapping
	public SsiSearchResponse search(@RequestBody SsiSearchRequest ssiSearchRequest) {
		List<SsiDetails> ssiDetails = ssiDetailsService.search(ssiSearchRequest);
		SsiSearchResponse ssiSearchResponse = ssiDetailsService.createSearchResponse(ssiDetails, (long)ssiSearchRequest.getOffset(), (long)ssiSearchRequest.getCount());
		return ssiSearchResponse;
	}
}
