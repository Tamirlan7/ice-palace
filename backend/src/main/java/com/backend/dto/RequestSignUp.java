package com.backend.dto;

import jakarta.validation.constraints.NotEmpty;

public record RequestSignUp(
        @NotEmpty(message = "phone property is required")
        String phone,
        @NotEmpty(message = "password property is required")
        String password
) {
}
