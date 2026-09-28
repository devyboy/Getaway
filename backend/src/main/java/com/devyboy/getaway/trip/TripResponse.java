package com.devyboy.getaway.trip;

import java.time.Instant;
import java.time.LocalDate;

public record TripResponse(
        Long id,
        String name,
        LocalDate startDate,
        LocalDate endDate,
        String destination,
        Instant createdAt,
        Instant updatedAt) {

    public static TripResponse from(Trip trip) {
        return new TripResponse(
                trip.getId(),
                trip.getName(),
                trip.getStartDate(),
                trip.getEndDate(),
                trip.getDestination(),
                trip.getCreatedAt(),
                trip.getUpdatedAt());
    }
}
