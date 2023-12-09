package com.backend.handlers;

import com.backend.exceptions.EntityNotFoundException;
import com.backend.exceptions.IceSkateTakenException;
import com.backend.exceptions.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    ResponseEntity<Map<String, String>> handleEntityNotFoundException(EntityNotFoundException e) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", e.getMessage());
        errors.put("error", "Not Found");
        errors.put("status", "404");
        errors.put("timestamp", Instant.now().toString());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(errors);
    }

    @ExceptionHandler(IceSkateTakenException.class)
    ResponseEntity<Map<String, String>> handleIceSkateTakenException(IceSkateTakenException e) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", e.getMessage());
        errors.put("error", "Bad request");
        errors.put("status", "400");
        errors.put("timestamp", Instant.now().toString());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(errors);
    }

    @ExceptionHandler(UnauthorizedException.class)
    ResponseEntity<Map<String, String>> handleNotAuthenticatedException(UnauthorizedException e) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", e.getMessage());
        errors.put("error", "Unauthorized");
        errors.put("status", "401");
        errors.put("timestamp", Instant.now().toString());

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(errors);
    }
}
