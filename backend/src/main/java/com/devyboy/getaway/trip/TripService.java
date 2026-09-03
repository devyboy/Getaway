package com.devyboy.getaway.trip;

import java.util.List;

import org.springframework.stereotype.Service;

import com.devyboy.getaway.exception.TripNotFoundException;

@Service
public class TripService {

    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> getTrips() {
        return tripRepository.findAll();
    }

    public Trip getTripById(Long id) {
        return tripRepository.findById(id).orElseThrow(() -> new TripNotFoundException(id));
    }

    public Trip postTrip(CreateTripRequest request) {
        Trip trip = new Trip(
                request.name(),
                request.startDate(),
                request.endDate(),
                request.destination());
        return tripRepository.save(trip);
    }
}
