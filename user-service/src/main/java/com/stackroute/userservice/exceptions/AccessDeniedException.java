package com.stackroute.userservice.exceptions;

public class AccessDeniedException extends Exception{
    private String message;

    public AccessDeniedException() {
    }

    public AccessDeniedException(String message) {
        super(message);
        this.message = message;
    }
}
