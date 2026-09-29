package com.devyboy.getaway.auth;

import com.devyboy.getaway.user.User;

public record RegisterResponse(
		Long id,
		String email) {

	public static RegisterResponse from(User user) {
		return new RegisterResponse(user.getId(), user.getEmail());
	}
}
