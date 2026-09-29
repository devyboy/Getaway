package com.devyboy.getaway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                // Once authentication is complete, permit only /auth/** endpoints.
                .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll())
                .formLogin(formLogin -> formLogin.disable())
                .build();
    }
}