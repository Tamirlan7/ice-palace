package com.backend.services;

import com.backend.dto.RequestTicketBuy;
import com.backend.exceptions.EntityNotFoundException;
import com.backend.exceptions.IceSkateTakenException;
import com.backend.models.*;
import com.backend.repositories.IceSessionRepository;
import com.backend.repositories.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final IceSessionRepository iceSessionRepository;
    private final TicketRepository ticketRepository;

    public void purchaseTicket(RequestTicketBuy ticket) throws EntityNotFoundException {
        IceSession iceSession = iceSessionRepository.findById(ticket.iceSessionId())
                        .orElseThrow(() -> new EntityNotFoundException("iceSession with id " + ticket.iceSessionId() + " not found"));

        Ticket createdTicket = Ticket
                .builder()
                .adultEntryCount(ticket.adultEntryCount())
                .childEntryCount(ticket.childEntryCount())
                .adultIceSkateCount(ticket.adultIceSkateCount())
                .childIceSkateCount(ticket.childIceSkateCount())
                .userPhone(ticket.userPhone())
                .iceSession(iceSession)
                .build();

        ticketRepository.save(createdTicket);
    }

    public List<Ticket> getTicketsOfTheSession(Long iceSessionId) {
        return ticketRepository.findAllByIceSessionId(iceSessionId);
    }
}
