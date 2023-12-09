package com.backend.controllers;

import com.backend.dto.IceSessionsDto;
import com.backend.exceptions.EntityNotFoundException;
import com.backend.models.IceSession;
import com.backend.services.IceSessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ice-session")
public class IceSessionController {
    private final IceSessionService iceSessionService;
    @GetMapping("")
    ResponseEntity<IceSessionsDto> getIceSessions() {
        return ResponseEntity.ok(iceSessionService.getAllIceSessions());
    }

    @GetMapping("/{iceSessionId}")
    ResponseEntity<Object> getIceSessionById(@PathVariable("iceSessionId") Long id) throws EntityNotFoundException {
        return ResponseEntity.ok(iceSessionService.getIceSessionById(id));
    }

    @GetMapping("/allowed")
    ResponseEntity<List<IceSession>> getAllowedIceSessions() {
        return ResponseEntity.ok(iceSessionService.getAllowedIceSessions());
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("")
    ResponseEntity<IceSession> createIceSession(@RequestBody @Valid IceSession iceSession) {
        IceSession createdIceSession = iceSessionService.createIceSession(iceSession);
        return ResponseEntity
                .created(URI.create("/api/v1/admin/ice-session/" + createdIceSession.getId().toString()))
                .body(createdIceSession);
    }

    @PutMapping("/{iceSessionId}")
    ResponseEntity<IceSession> updateIceSessionById(
            @PathVariable("iceSessionId") Long id,
            @RequestBody IceSession iceSession
    ) throws EntityNotFoundException {
        IceSession changedIceSession = iceSessionService.updateIceSessionById(id, iceSession);

        return ResponseEntity
                .created(URI.create("/api/v1/admin/ice-session/" + changedIceSession.getId().toString()))
                .body(changedIceSession);

    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/{iceSessionId}")
    @ResponseStatus(HttpStatus.OK)
    void deleteIceSessionById(@PathVariable("iceSessionId") Long id) {
        iceSessionService.deleteIceSessionById(id);
    }
}
