package com.devyboy.getaway.trip;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public List<Trip> getTrips() {
        return tripService.getTrips();
    }

    @PostMapping
    public ResponseEntity<Trip> postTrip(@RequestBody CreateTripRequest request) {
        Trip createdTrip = tripService.postTrip(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTrip);
    }
}
