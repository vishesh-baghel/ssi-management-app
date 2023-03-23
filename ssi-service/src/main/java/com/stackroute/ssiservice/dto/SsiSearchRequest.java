package com.stackroute.ssiservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import netscape.javascript.JSObject;
import org.springframework.data.util.Pair;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SsiSearchRequest {
    private Filter[] filter;
    private int offset;
    private int count;
    private Pair<String,String> sortBy;
}
