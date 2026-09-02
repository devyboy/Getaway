package com.devyboy.getaway.trip;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TripResponse(
        Long id,
        String name,
        LocalDate startDate,
        LocalDate endDate,
        String destination,
        LocalDateTime created_at,
        LocalDateTime updated_at) {

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
