package com.backend.services;

import com.backend.dto.UserDto;
import com.backend.models.User;
import com.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.nio.file.AccessDeniedException;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserDto getUser(Authentication authentication) throws AccessDeniedException {
        if (authentication.getPrincipal() instanceof User user) {
            return new UserDto(
                    user.getId(),
                    user.getRole()
            );
        }

        throw new AccessDeniedException("Principal is not instance of User");
    }
}
