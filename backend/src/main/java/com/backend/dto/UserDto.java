package com.backend.dto;

import com.backend.models.Role;

public record UserDto(
    Long id,
    Role role
) {
}
