package com.stackroute.ssiservice.dto;

import lombok.*;
import netscape.javascript.JSObject;
import org.springframework.data.util.Pair;

import java.util.HashMap;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SsiSearchRequest {
    private Filter[] filter;
    private int offset;
    private int count;
    private HashMap<String,String> sort;
}
