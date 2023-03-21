package com.stackroute.ssiservice.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.ssiservice.dto.SsiRequest;
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
	public String addNewSsi(@RequestBody SsiRequest ssiRequest, HttpServletRequest request) {
		ssiDetailsService.addSsi(ssiRequest);
		return "";
	}
	@DeleteMapping("/delete/{ssiRefId}")
	public void deleteSsi(@PathVariable("ssiRefId") int id) {
		ssiDetailsService.deleteSsi(id);
	}
	@PostMapping("/update/{id}")
	public void updateSsi(@PathVariable("id") int id, @RequestBody SsiRequest ssiRequest) {
		ssiDetailsService.updateSsi(ssiRequest, id);
	}
}
