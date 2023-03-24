package com.stackroute.userservice.exceptions;

public class InvalidTokenException extends Exception{
    private String message;

    public InvalidTokenException() {
    }

    public InvalidTokenException(String message) {
        super(message);
        this.message = message;
    }
}
