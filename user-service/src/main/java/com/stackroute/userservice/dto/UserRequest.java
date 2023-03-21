package com.stackroute.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequest {

    private String userName;
    private String password;
    private String email;
    private String companyName;
    private String role;
    private int offset;
    private int count;
    private String sortBy;
    private String orderBy;
    private Boolean isAdmin;
    private String exportAs;
}
