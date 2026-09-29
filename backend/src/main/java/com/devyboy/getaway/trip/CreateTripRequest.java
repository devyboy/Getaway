package com.devyboy.getaway.trip;

import java.time.LocalDate;

public record CreateTripRequest(
        String name,
        LocalDate startDate,
        LocalDate endDate,
        String destination
) {
}