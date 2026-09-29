package com.devyboy.getaway.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devyboy.getaway.user.User;

public interface AuthRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}
