package com.stackroute.userservice.dto;

import com.stackroute.userservice.entity.User;

public class JwtResponse {

    private User user;
    private String message;
    private String jwtToken;

    public JwtResponse(User user, String jwtToken, String message) {
        this.user = user;
        this.jwtToken = jwtToken;
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
