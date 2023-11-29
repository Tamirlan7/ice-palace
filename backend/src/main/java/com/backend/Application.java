package com.backend;

import com.backend.models.Role;
import com.backend.models.User;
import com.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		userRepository.save(
				User.builder()
						.phone("+77066662222")
						.role(Role.ROLE_USER)
						.password(passwordEncoder.encode("1234"))
						.build()
		);

		userRepository.save(
				User.builder()
						.phone("+77066661111")
						.role(Role.ROLE_ADMIN)
						.password(passwordEncoder.encode("1234"))
						.build()
		);
	}
}
