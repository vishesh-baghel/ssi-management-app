package com.stackroute.ssiservice.exceptions;

import com.stackroute.ssiservice.dto.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidRequestBodyException.class)
    public ResponseEntity<ErrorMessage> invalidRequestBodyException(InvalidRequestBodyException exception) {
        String message = exception.getMessage();
        ErrorMessage errorMessage = new ErrorMessage(message, "400");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }
}
