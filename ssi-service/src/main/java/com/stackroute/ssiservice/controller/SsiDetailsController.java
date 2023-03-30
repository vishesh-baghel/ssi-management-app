package com.stackroute.ssiservice.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.TypedQuery;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.stackroute.ssiservice.dto.*;
import com.stackroute.ssiservice.exceptions.InvalidRequestBodyException;
import com.stackroute.ssiservice.exceptions.InvalidSsiEntry;
import com.stackroute.ssiservice.export.ExcelGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stackroute.ssiservice.exceptions.InvalidSsiEntry;
import com.stackroute.ssiservice.exceptions.SsiNotFoundException;
import com.stackroute.ssiservice.model.SsiDetails;
import com.stackroute.ssiservice.service.SsiDetailsService;

@RestController
@RequestMapping("/ssi")
@CrossOrigin
@Slf4j
public class SsiDetailsController {

    List<SsiDetails> exportList;

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

    @PostMapping
    public ResponseEntity<?> fetchSsi(@RequestBody SsiSearchRequest ssiSearchRequest) {

        TypedQuery<SsiDetails> ssiList = ssiDetailsService.fetch(ssiSearchRequest);

        Long total = (long) ssiList.getResultList().size();
        ssiSearchRequest.setCount(ssiSearchRequest.getCount()==0?3:ssiSearchRequest.getCount());
        ssiSearchRequest.setOffset(ssiSearchRequest.getOffset()==0?1:ssiSearchRequest.getOffset());

        List<SsiDetails> results = ssiList
                .setFirstResult((ssiSearchRequest.getOffset() - 1) * ssiSearchRequest.getCount())
                .setMaxResults(ssiSearchRequest.getCount())
                .getResultList();

        SsiSearchResponse response = new SsiSearchResponse().builder()
                .status(HttpStatus.OK).message("")
                .count((long) ssiSearchRequest.getCount()).offset((long) ssiSearchRequest.getOffset()).total(total)
                .results(results)
                .build();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS,"*");
        System.out.println(response);

        return new ResponseEntity<SsiSearchResponse>(response,httpHeaders,HttpStatus.OK);
    }

    @GetMapping("/export-to-excel")
    @ResponseStatus(HttpStatus.OK)
    public void exportIntoExcelFile(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=user" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        ExcelGenerator generator = new ExcelGenerator(exportList);
        generator.generateExcelFile(response);
    }

    private String exportUtil(List<SsiDetails> list) {
        exportList = list;
        return "https://ssimanagementsystem.stackroute.io/ssi/export-to-excel";
    }

    @PostMapping("/fetch")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public SsiDataResponse fetchSsiDetails(@RequestBody SsiDataRequest ssiDataRequest) {
        String ssiRefId = ssiDataRequest.getSsiRefId();
        String sortBy = ssiDataRequest.getSortBy();
        String orderBy = ssiDataRequest.getOrderBy();
        int pageNumber = ssiDataRequest.getOffset();
        int pageSize = ssiDataRequest.getCount();

        if (sortBy == null || sortBy.isEmpty() || orderBy == null || orderBy.isEmpty() || pageNumber < 0 || pageSize < 0) {
            sortBy = "ssiRefId";
            orderBy = "asc";
            pageNumber = 0;
            pageSize = 10;
        }

//        if (userName != null) {
//            User user = userService.findUserByUserName(userName);
//            return userService.createUserResponse(user, pageNumber, pageSize);
//        }
//        if (email != null){
//            User user = userService.findUserByEmail(email);
//            return userService.createUserResponse(user, pageNumber, pageSize);
//        }
//        if (ssiRefId != null){
//            List<> users = userService.findAllUsersByCompanyName(companyName, pageNumber, pageSize, sortBy, orderBy);
//            String exportLink = exportUtil(users);
//            log.info("Users by company name: {}", users);
//            return userService.createUserResponseList(users, pageNumber, pageSize, exportLink);
//        }
//        if (role != null){
//            List<User> users = userService.findAllUsersByRole(role, pageNumber, pageSize, sortBy, orderBy);
//            String exportLink = exportUtil(users);
//            log.info("Users by role: {}", users);
//            return userService.createUserResponseList(users, pageNumber, pageSize, exportLink);
//        }
        List<SsiDetails> ssis = ssiDetailsService.findAllSsis(pageNumber, pageSize, sortBy, orderBy);
        log.info("Ssis: {}", ssis);
        String exportLink = exportUtil(ssis);
        return ssiDetailsService.createSsiDataResponseList(ssis, pageNumber, pageSize, exportLink);
    }

    @PatchMapping("/edit")
    @ResponseStatus(HttpStatus.OK)
    public Response updateSsiDetails(@RequestBody SsiDataRequest ssiDataRequest) throws InvalidRequestBodyException {
        Boolean isPrimary = ssiDataRequest.getIsPrimary();

        if (isPrimary == null) {
            throw new InvalidRequestBodyException("isPrimary field is required");
        }

        SsiDetails ssi = ssiDetailsService.findBySsiId(ssiDataRequest.getSsiRefId());

//        ssiDetailsService.updateSsi(ssiDataRequest, ssiDataRequest.getSsiRefId());
        return Response.builder()
                .message("Ssi updated successfully")
                .status(200)
                .build();
    }

}
