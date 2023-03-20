package com.stackroute.userservice.dto;

import lombok.Data;

@Data
public class PasswordRequest {
    private String email;
    private String oldPassword;
    private String newPassword;
}
