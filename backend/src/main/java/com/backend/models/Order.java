package com.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "userPhone is required.")
    @Column(nullable = false)
    private String userPhone;

    @Column(name = "issued_at", nullable = false)
    private LocalDateTime issuedAt;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    @Positive(message = "adultEntryCount must be positive.")
    @NotNull(message = "adultEntryCount is required.")
    @Column(name = "adult_entry_count")
    private Integer adultEntryCount;

    @Positive(message = "childEntryCount must be positive.")
    @NotNull(message = "childEntryCount is required.")
    @Column(name = "child_entry_count")
    private Integer childEntryCount;

    @Positive(message = "adultIceSkateCount must be positive.")
    @NotNull(message = "adultIceSkateCount is required.")
    @Column(name = "adult_ice_skate_count")
    private Integer adultIceSkateCount;

    @Positive(message = "childIceSkateCount must be positive.")
    @NotNull(message = "childIceSkateCount is required.")
    @Column(name = "child_ice_skate_count")
    private Integer childIceSkateCount;

    @Positive(message = "totalPrice must be positive.")
    @NotNull(message = "totalPrice is required.")
    @Column(nullable = false)
    private Integer totalPrice;
}
