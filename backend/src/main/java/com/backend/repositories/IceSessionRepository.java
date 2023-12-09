package com.backend.repositories;

import com.backend.models.DayCategory;
import com.backend.models.IceSession;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface IceSessionRepository extends JpaRepository<IceSession, Long> {
    List<IceSession> findByDayCategory(DayCategory dayCategory);
    List<IceSession> findIceSessionByStartTimeIsAfterAndDayCategoryEquals(LocalTime startTime,
                                                                          @NotNull(message = "property dayCategory is required.") DayCategory dayCategory);
}
