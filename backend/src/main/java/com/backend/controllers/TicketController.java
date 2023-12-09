package com.backend.controllers;

import com.backend.dto.RequestTicketBuy;
import com.backend.exceptions.EntityNotFoundException;
import com.backend.models.Ticket;
import com.backend.services.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ticket")
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/purchase")
    @ResponseStatus(HttpStatus.CREATED)
    public void purchaseTicket(@RequestBody @Valid RequestTicketBuy ticket) throws EntityNotFoundException {
        ticketService.purchaseTicket(ticket);
    }

    @GetMapping("/ice-session/{iceSessionId}")
    public ResponseEntity<List<Ticket>> getTicketsOfTheSession(@PathVariable("iceSessionId") Long iceSessionId) {
        return ResponseEntity.ok(ticketService.getTicketsOfTheSession(iceSessionId));
    }
}
