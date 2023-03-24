package com.stackroute.ssiservice.controller;

import java.util.List;

import javax.persistence.TypedQuery;
import javax.servlet.http.HttpServletRequest;

import com.stackroute.ssiservice.exceptions.InvalidSsiEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stackroute.ssiservice.dto.SsiDataRequest;
import com.stackroute.ssiservice.dto.SsiSearchRequest;
import com.stackroute.ssiservice.dto.SsiSearchResponse;
import com.stackroute.ssiservice.exceptions.InvalidSsiEntry;
import com.stackroute.ssiservice.exceptions.SsiNotFoundException;
import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.service.SsiDetailsService;

@RestController
@RequestMapping("/ssi")
@CrossOrigin
public class SsiDetailsController {

    @Autowired
    private SsiDetailsService ssiDetailsService;

    @PostMapping("/add")
    public ResponseEntity<?> addNewSsi(@RequestBody SsiDataRequest ssiDataRequest, HttpServletRequest request) {
        ResponseEntity<?> responseEntity = new  ResponseEntity<>(HttpStatus.OK);
        try {
            SsiDetails data = ssiDetailsService.addSsi(ssiDataRequest);
            System.out.println("Inside try");
            responseEntity=new  ResponseEntity<SsiDetails>(data,HttpStatus.CREATED);
            System.out.println(responseEntity.getStatusCodeValue());
        } catch (InvalidSsiEntry e) {
            System.out.println(e.getMessage());
            responseEntity=new  ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        System.out.println(responseEntity.getStatusCodeValue());
        return responseEntity;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteSsi(@PathVariable("id") int id) {
        ResponseEntity<?> responseEntity = null;
        try {
            SsiDetails data = ssiDetailsService.deleteSsi(id);
            responseEntity = new ResponseEntity<SsiDetails>(data,HttpStatus.OK);
        } catch (SsiNotFoundException e) {
            System.out.println(e.getMessage());
            responseEntity = new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateSsi(@PathVariable("id") int id, @RequestBody SsiDataRequest ssiDataRequest) {
        ResponseEntity<?> responseEntity = null;
        try {
            SsiDetails data = ssiDetailsService.updateSsi(ssiDataRequest, id);
            responseEntity=new  ResponseEntity<SsiDetails>(data,HttpStatus.CREATED);
        } catch (InvalidSsiEntry e) {
            System.out.println(e.getMessage());
            responseEntity=new  ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @PostMapping("")
    public SsiSearchResponse fetchSsi(@RequestBody SsiSearchRequest ssiSearchRequest) {

        TypedQuery<SsiDetails> ssiList = ssiDetailsService.fetch(ssiSearchRequest);

        Long total = (long) ssiList.getResultList().size();
        ssiSearchRequest.setCount(ssiSearchRequest.getCount()==0?3:ssiSearchRequest.getCount());
        ssiSearchRequest.setOffset(ssiSearchRequest.getOffset()==0?1:ssiSearchRequest.getOffset());

        List<SsiDetails> results = ssiList
                .setFirstResult((ssiSearchRequest.getOffset() - 1) * ssiSearchRequest.getCount())
                .setMaxResults(ssiSearchRequest.getCount())
                .getResultList();

        return new SsiSearchResponse().builder()
                .status(HttpStatus.OK).message("")
                .count((long) ssiSearchRequest.getCount()).offset((long) ssiSearchRequest.getOffset()).total(total)
                .results(results)
                .build();
    }
}
