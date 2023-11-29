package com.backend.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class CsrfController {

    @GetMapping("/api/v1/csrf")
    ResponseEntity<Map<String, String>> csrf(CsrfToken token) {
        Map<String, String> csrfResponse = new HashMap<>();
        csrfResponse.put("headerName", "X-CSRF-TOKEN");
        csrfResponse.put("token", token.getToken());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(csrfResponse);
    }


}
