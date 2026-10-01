package com.devyboy.getaway.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devyboy.getaway.exception.AccountAlreadyExistsException;
import com.devyboy.getaway.user.User;

@Service
public class AuthService {

    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(AuthRepository authRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager) {
        this.authRepository = authRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
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

    public Authentication login(AuthRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.email(),
                request.password());

        return authenticationManager.authenticate(authToken);
    }
}
