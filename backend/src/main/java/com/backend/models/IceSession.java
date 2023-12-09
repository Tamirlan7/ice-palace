package com.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_ice_session")
@Entity
public class IceSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull(message = "sessionCount is required.")
    private Integer sessionCount;

    @Column(name = "start_time", nullable = false, columnDefinition = "TIME")
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false, columnDefinition = "TIME")
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "property dayCategory is required.")
    @Column(name = "day_category", nullable = false)
    private DayCategory dayCategory;

    @NotNull(message = "property adultEntryPrice is required.")
    @Column(name = "adult_entry_price", nullable = false)
    @Positive(message = "adultEntryPrice must be positive")
    private Integer adultEntryPrice;

    @Column(name = "child_entry_price", nullable = false)
    @NotNull(message = "property childEntryPrice is required.")
    @Positive(message = "childEntryPrice must be positive")
    private Integer childEntryPrice;

    @NotNull(message = "property adultIceSkatePrice is required.")
    @Column(name = "adult_ice_skate_price", nullable = false)
    @Positive(message = "adultIceSkatePrice must be positive")
    private Integer adultIceSkatePrice;

    @Column(name = "child_ice_skate_price", nullable = false)
    @NotNull(message = "property childIceSkatePrice is required.")
    @Positive(message = "childIceSkatePrice must be positive")
    private Integer childIceSkatePrice;
}
