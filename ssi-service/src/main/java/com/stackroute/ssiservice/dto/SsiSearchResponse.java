package com.stackroute.ssiservice.dto;

import com.stackroute.ssiservice.model.SsiDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SsiSearchResponse {
    private int status;
    private String message;
    private Long offset;
    private Long count;
    private Long total;
    private List<SsiDetails> results;
}
