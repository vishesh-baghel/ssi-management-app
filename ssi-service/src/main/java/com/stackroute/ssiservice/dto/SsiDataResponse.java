package com.stackroute.ssiservice.dto;

import com.stackroute.ssiservice.model.SsiDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SsiDataResponse {
    private HttpStatus status;
    private String message;
    private Long offset;
    private Long count;
    private Long total;
    private String exportLink;
    private List<SsiDetails> results;
}
