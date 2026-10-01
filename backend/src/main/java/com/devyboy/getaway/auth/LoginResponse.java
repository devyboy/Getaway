package com.devyboy.getaway.auth;

import org.springframework.security.core.Authentication;

public record LoginResponse(String email) {
    public static LoginResponse from(Authentication authentication) {
        return new LoginResponse(authentication.getName());
    }
}
