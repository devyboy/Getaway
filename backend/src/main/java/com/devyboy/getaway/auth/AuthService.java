package com.devyboy.getaway.auth;

import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devyboy.getaway.exception.AccountAlreadyExistsException;
import com.devyboy.getaway.user.User;

@Service
public class AuthService {

    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    public AuthService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    public User register(AuthRequest request) {
        final String email = request.email();
        final String password = request.password();

        if (authRepository.existsByEmail(email)) {
            throw new AccountAlreadyExistsException(email);
        }

        final String encodedPassword = passwordEncoder.encode(password);

        User user = new User(email, encodedPassword);
        authRepository.save(user);

        return user;
    }

    public User login(AuthRequest request) {
        return new User(request.email(), request.password());
    }
}
