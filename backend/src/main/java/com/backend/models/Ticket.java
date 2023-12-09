package com.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "_ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 11, message = "phone length has exceeded its limit which is 11")
    @Column(nullable = false, length = 11)
    private String userPhone;

    @NotNull(message = "iseSession is required.")
    @ManyToOne
    @JoinColumn(name = "ice_session_id")
    private IceSession iceSession;

    @NotNull(message = "adultEntryCount is required.")
    @Column(name = "adult_entry_count")
    private Integer adultEntryCount;

    @NotNull(message = "childEntryCount is required.")
    @Column(name = "child_entry_count")
    private Integer childEntryCount;

    @NotNull(message = "adultIceSkateCount is required.")
    @Column(name = "adult_ice_skate_count")
    private Integer adultIceSkateCount;

    @NotNull(message = "childIceSkateCount is required.")
    @Column(name = "child_ice_skate_count")
    private Integer childIceSkateCount;
}
