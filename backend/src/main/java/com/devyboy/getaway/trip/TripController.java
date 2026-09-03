package com.devyboy.getaway.trip;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trips")
@CrossOrigin(origins = "http://localhost:3000")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public List<TripResponse> getTrips() {
        return tripService.getTrips().stream()
                .map(TripResponse::from)
                .toList();
    }

    @GetMapping("/{id}")
    public TripResponse getTripById(@PathVariable Long id) {
        return TripResponse.from(tripService.getTripById(id));
    }

    @PostMapping
    public ResponseEntity<TripResponse> postTrip(@RequestBody CreateTripRequest request) {
        Trip createdTrip = tripService.postTrip(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(TripResponse.from(createdTrip));
    }
}
