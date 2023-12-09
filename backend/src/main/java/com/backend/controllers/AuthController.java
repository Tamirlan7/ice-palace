package com.backend.controllers;

import com.backend.dto.RequestSignIn;
import com.backend.dto.RequestSignUp;
import com.backend.exceptions.UnauthorizedException;
import com.backend.services.AuthService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
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
    @PostMapping("/sign-out")
    @ResponseStatus(HttpStatus.OK)
    void logout(HttpServletRequest request) throws ServletException {
        request.logout();
    }
    @GetMapping("/is-authenticated")
    @ResponseStatus(HttpStatus.OK)
    void isAuthenticated(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("User is not authenticated");
        }
    }
}
