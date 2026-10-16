package com.devyboy.getaway.auth;

import java.util.List;

import org.springframework.security.core.Authentication;

public record LoginResponse(String email, List<String> authorities) {

    public static LoginResponse from(Authentication authentication) {
        List<String> authorities = authentication.getAuthorities().stream()
                .map(authority -> authority.getAuthority()).toList();

        return new LoginResponse(authentication.getName(), authorities);
    }
}
