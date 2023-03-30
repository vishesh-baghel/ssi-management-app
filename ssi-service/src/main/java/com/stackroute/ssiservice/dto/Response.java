package com.stackroute.ssiservice.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class Response {
    private int status;
    private String message;
}
