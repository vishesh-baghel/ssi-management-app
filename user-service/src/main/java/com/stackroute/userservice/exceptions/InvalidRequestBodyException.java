package com.stackroute.userservice.exceptions;

public class InvalidRequestBodyException extends Exception {

    private String message;

    public InvalidRequestBodyException(String message) {
        super(message);
        this.message = message;
    }
}
