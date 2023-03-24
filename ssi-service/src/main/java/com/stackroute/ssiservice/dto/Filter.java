package com.stackroute.ssiservice.dto;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Filter {
    private String column;
    private String operator;
    private String [] values;

}
