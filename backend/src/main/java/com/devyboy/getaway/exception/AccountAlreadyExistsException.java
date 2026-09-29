package com.devyboy.getaway.exception;

public class AccountAlreadyExistsException extends RuntimeException {

    public AccountAlreadyExistsException(String email) {
        super("Getaway account already exists with email " + email);
    }
}
