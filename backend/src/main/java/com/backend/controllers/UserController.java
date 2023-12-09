package com.backend.controllers;

import com.backend.models.User;
import com.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;
import java.security.Principal;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping()
    ResponseEntity<Object> getUser(Authentication authentication) {
        try {
            return ResponseEntity.ok(userService.getUser(authentication));
        } catch (AccessDeniedException e) {
            Map<String, String> errors = new HashMap<>();

            errors.put("message", e.getMessage());
            errors.put("error", "Forbidden");
            errors.put("status", "403");
            errors.put("path", "/api/v1/user");
            errors.put("timestamp", Instant.now().toString());

            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errors);
        }
    }
}
