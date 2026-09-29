package com.devyboy.getaway.auth;

public record AuthRequest(
        String email,
        String password) {
}
