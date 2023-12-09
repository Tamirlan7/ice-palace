package com.backend.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record RequestTicketBuy(
        @NotNull(message = "iseSessionId is required.")
        Long iceSessionId,
        @NotBlank(message = "userPhone is required.")
        String userPhone,
        @NotNull(message = "adultEntryCount is required.")
        Integer adultEntryCount,
        @NotNull(message = "childEntryCount is required.")
        Integer childEntryCount,
        @NotNull(message = "adultIceSkateCount is required.")
        Integer adultIceSkateCount,
        @NotNull(message = "childIceSkateCount is required.")
        Integer childIceSkateCount
) {
}
