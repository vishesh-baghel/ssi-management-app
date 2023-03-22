package com.stackroute.ssiservice.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stackroute.ssiservice.dto.SsiDataRequest;
import com.stackroute.ssiservice.exceptions.SsiNotFoundException;
import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.service.SsiDetailsService;

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
	public String addNewSsi(@RequestBody SsiDataRequest ssiDataRequest, HttpServletRequest request) {
		SsiDetails data = ssiDetailsService.addSsi(ssiDataRequest);
		return "user added";
	}
	@DeleteMapping("/{ssiRefId}")
	public void deleteSsi(@PathVariable("ssiRefId") int id) throws SsiNotFoundException {
		ssiDetailsService.deleteSsi(id);
	}
	@PatchMapping("/{id}")
	public void updateSsi(@PathVariable("id") int id, @RequestBody SsiDataRequest ssiDataRequest) {
		ssiDetailsService.updateSsi(ssiDataRequest, id);
	}
	@GetMapping("/accountnumber/{accountNumber}")
	public List<SsiDetails> getSsiByAccountNumber(@PathVariable("accountNumber") String accountNumber){
		return ssiDetailsService.searchByAccountNumber(accountNumber);
	}

	@PostMapping
	public void search(@RequestBody SsiDataRequest ssiDataRequest){

	}
}
