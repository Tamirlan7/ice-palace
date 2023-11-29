package com.backend.controllers;

import com.backend.dto.RequestSignIn;
import com.backend.dto.RequestSignUp;
import com.backend.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    void signUp(@RequestBody @Valid RequestSignUp requestSignUp) {
        authService.signUp(requestSignUp);
    }

    @PostMapping("/sign-in")
    @ResponseStatus(HttpStatus.OK)
    void signIn(@RequestBody @Valid RequestSignIn requestSignIn, HttpServletRequest request, HttpServletResponse response) {
        authService.signIn(requestSignIn, request, response);
    }
}
