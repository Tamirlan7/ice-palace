package com.backend.dto;

import com.backend.models.IceSession;

import java.util.List;

public record IceSessionsDto(
        List<IceSession> weekdays,
        List<IceSession> festiveDaysOrWeekends
) {

}
