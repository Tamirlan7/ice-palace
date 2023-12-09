package com.backend.services;

import com.backend.dto.IceSessionsDto;
import com.backend.models.DayCategory;
import com.backend.exceptions.EntityNotFoundException;
import com.backend.models.IceSession;
import com.backend.repositories.IceSessionRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class IceSessionService {
    private static final Logger LOGGER = LoggerFactory.getLogger(IceSessionService.class);
    private final IceSessionRepository iceSessionRepository;

    public IceSessionsDto getAllIceSessions() {
        List<IceSession> weekDayIceSessions = this.iceSessionRepository.findByDayCategory(DayCategory.WEEKDAY);
        List<IceSession> weekendOrFestiveDayIceSessions = this.iceSessionRepository.findByDayCategory(DayCategory.WEEKEND_OR_FESTIVE_DAY);
        return new IceSessionsDto(
                weekDayIceSessions,
                weekendOrFestiveDayIceSessions
        );
    }

    public IceSession getIceSessionById(Long id) throws EntityNotFoundException {
        return this.iceSessionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ice session with id " + id + " not found"));
    }

    public IceSession createIceSession(IceSession iceSession) {
        return this.iceSessionRepository.save(
                IceSession.builder()
                        .sessionCount(iceSession.getSessionCount())
                        .endTime(iceSession.getEndTime())
                        .startTime(iceSession.getStartTime())
                        .dayCategory(iceSession.getDayCategory())
                        .adultEntryPrice(iceSession.getAdultEntryPrice())
                        .childEntryPrice(iceSession.getChildEntryPrice())
                        .adultIceSkatePrice(iceSession.getAdultIceSkatePrice())
                        .childIceSkatePrice(iceSession.getChildIceSkatePrice())
                        .build()
        );
    }

    public IceSession updateIceSessionById(Long id, IceSession updatedIceSession) throws EntityNotFoundException {
        IceSession iceSession = this.iceSessionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ice session with id " + id + " not found"));

        Field[] fields = updatedIceSession.getClass().getDeclaredFields();
        for (Field field : fields) {
            Field iceSessionField = null;

            try {
                field.setAccessible(true);
                Object value = field.get(updatedIceSession);

                if (field.getName().equals("id") || value == null) {
                    field.setAccessible(false);
                    continue;
                }

                iceSessionField = iceSession.getClass().getDeclaredField(field.getName());
                iceSessionField.setAccessible(true);
                iceSessionField.set(iceSession, value);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                LOGGER.error(e.getMessage(), e);
            } finally {
                field.setAccessible(false);

                if (iceSessionField != null) {
                    iceSessionField.setAccessible(false);
                }
            }
        }

        return this.iceSessionRepository.save(iceSession);
    }

    public void deleteIceSessionById(Long id) {
        this.iceSessionRepository.deleteById(id);
    }

    public List<IceSession> getAllowedIceSessions() {
        LocalTime now = LocalTime.now();

        var cal = Calendar.getInstance();
        cal.setTime(new Date(System.currentTimeMillis()));
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        DayCategory dayCategory = DayCategory.WEEKDAY;

        if (dayOfWeek == 7 || dayOfWeek == 1) {
            // it is weekend
            dayCategory = DayCategory.WEEKEND_OR_FESTIVE_DAY;
        }

        return iceSessionRepository.findIceSessionByStartTimeIsAfterAndDayCategoryEquals(now, dayCategory);
    }
}
