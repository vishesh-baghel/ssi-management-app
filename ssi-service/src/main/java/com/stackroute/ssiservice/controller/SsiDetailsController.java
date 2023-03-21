package com.stackroute.ssiservice.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.service.SsiDetailsService;

@RestController
@RequestMapping("/ssi")
public class SsiDetailsController {

	@Autowired
	private SsiDetailsService ssiDetailsService;

	@PostMapping("/add")
	public String addNewSsi(@RequestBody SsiDetails ssiRequest, HttpServletRequest request) {
		// Ssi createdSsi = ssiDetalisService.addSsi(ssiRequest);
		return "";
	}

}
