package com.backend;

import com.backend.models.*;
import com.backend.repositories.IceSessionRepository;
import com.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalTime;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private IceSessionRepository iceSessionRepository;
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		userRepository.save(
				User.builder()
						.phone("82222222222")
						.role(Role.ROLE_USER)
						.password(passwordEncoder.encode("1234"))
						.build()
		);

		userRepository.save(
				User.builder()
						.phone("81111111111")
						.role(Role.ROLE_ADMIN)
						.password(passwordEncoder.encode("1234"))
						.build()
		);

		iceSessionRepository.save(
				IceSession.builder()
						.startTime(LocalTime.of(21, 30))
						.endTime(LocalTime.of(22, 30))
						.sessionCount(4)
						.dayCategory(DayCategory.WEEKDAY)
						.adultEntryPrice(1200)
						.childEntryPrice(800)
						.adultIceSkatePrice(1200)
						.childIceSkatePrice(800)
						.build()
		);

		iceSessionRepository.save(
				IceSession.builder()
						.startTime(LocalTime.of(17, 0))
						.endTime(LocalTime.of(18, 0))
						.sessionCount(3)
						.dayCategory(DayCategory.WEEKDAY)
						.adultEntryPrice(1200)
						.childEntryPrice(800)
						.adultIceSkatePrice(1200)
						.childIceSkatePrice(800)
						.build()
		);

		iceSessionRepository.save(
				IceSession.builder()
						.startTime(LocalTime.of(13, 0))
						.endTime(LocalTime.of(14, 0))
						.sessionCount(2)
						.dayCategory(DayCategory.WEEKDAY)
						.adultEntryPrice(1200)
						.childEntryPrice(800)
						.adultIceSkatePrice(1200)
						.childIceSkatePrice(800)
						.build()
		);

		iceSessionRepository.save(
				IceSession.builder()
						.startTime(LocalTime.of(10, 30))
						.endTime(LocalTime.of(11, 30))
						.sessionCount(1)
						.dayCategory(DayCategory.WEEKDAY)
						.adultEntryPrice(1200)
						.childEntryPrice(800)
						.adultIceSkatePrice(1200)
						.childIceSkatePrice(800)
						.build()
		);

		iceSessionRepository.save(
				IceSession.builder()
						.startTime(LocalTime.of(9, 20))
						.sessionCount(1)
						.endTime(LocalTime.of(10, 20))
						.dayCategory(DayCategory.WEEKEND_OR_FESTIVE_DAY)
						.adultEntryPrice(1200)
						.childEntryPrice(800)
						.adultIceSkatePrice(1200)
						.childIceSkatePrice(800)
						.build()
		);

		iceSessionRepository.save(
				IceSession.builder()
						.startTime(LocalTime.of(11, 20))
						.sessionCount(2)
						.endTime(LocalTime.of(12, 20))
						.dayCategory(DayCategory.WEEKEND_OR_FESTIVE_DAY)
						.adultEntryPrice(1200)
						.childEntryPrice(800)
						.adultIceSkatePrice(1200)
						.childIceSkatePrice(800)
						.build()
		);

		iceSessionRepository.save(
				IceSession.builder()
						.startTime(LocalTime.of(15, 20))
						.sessionCount(3)
						.endTime(LocalTime.of(16, 20))
						.dayCategory(DayCategory.WEEKEND_OR_FESTIVE_DAY)
						.adultEntryPrice(1200)
						.childEntryPrice(800)
						.adultIceSkatePrice(1200)
						.childIceSkatePrice(800)
						.build()
		);

		iceSessionRepository.save(
				IceSession.builder()
						.startTime(LocalTime.of(19, 20))
						.sessionCount(4)
						.endTime(LocalTime.of(20, 20))
						.dayCategory(DayCategory.WEEKEND_OR_FESTIVE_DAY)
						.adultEntryPrice(1200)
						.childEntryPrice(800)
						.adultIceSkatePrice(1200)
						.childIceSkatePrice(800)
						.build()
		);
	}
}
