package com.backend.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
public class MyController {

    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> user(Principal principal) {
        String name = "";

        if (principal != null) {
            name = principal.getName();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", "hello user " + name));
    }

    @GetMapping("/admin")
    public ResponseEntity<Map<String, String>> admin(Principal principal) {
        String name = "";

        if (principal != null) {
            name = principal.getName();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", "hello admin " + name));
    }


}
