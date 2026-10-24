package com.devyboy.getaway.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private AuthService authService;
    private SecurityContextRepository securityContextRepository;

    public AuthController(AuthService authService, SecurityContextRepository securityContextRepository) {
        this.authService = authService;
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegisterResponse register(@RequestBody AuthRequest request) {
        return RegisterResponse.from(authService.register(request));
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthRequest authRequest, HttpServletRequest request,
            HttpServletResponse response) {

        // Attempt to authenticate the user, throws if invalid
        Authentication authentication = authService.login(authRequest);

        // If valid login, create security context and set user's authentication
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        // Put context in a repository to persist through subsequent requests
        securityContextRepository.saveContext(context, request, response);

        return LoginResponse.from(authentication);
    }

    @GetMapping("/me")
    public LoginResponse me(Authentication authentication) {
        return LoginResponse.from(authentication);
    }
}
