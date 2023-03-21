package com.stackroute.userservice.dto;

import com.stackroute.userservice.entity.User;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class UserResponse {
    private int status;
    private String message;
    private Long offset;
    private Long count;
    private Long total;
    private List<User> results;

}
