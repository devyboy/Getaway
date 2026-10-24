"use client";

import { getTrips, type Trip } from "@/lib/api/trips";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Trips() {
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function loadTrips() {
            try {
                const data = await getTrips();
                if (isMounted) {
                    setTrips(data);
                    setStatus("success");
                }
            } catch {
                if (isMounted) {
                    setStatus("error");
                }
            }
        }

        loadTrips();

        return () => {
            isMounted = false;
        };
    }, []);

    if (status === "loading") {
        return <p>Loading trips...</p>;
    }

    if (status === "error") {
        return <p>Could not load your trips.</p>;
    }

    return (
        <>
            <h1>View your trips here</h1>
            {trips.length ? trips.map(({ name, destination, id }) => (
                <Link href={`/trips/${id}`} className="text-orange-500" key={id}>
                    {name}: {destination}
                </Link>
            )) : <p>No trips, create one!</p>}
            <Link className="text-purple-500" href="/trips/create">Create new trip</Link>
        </>
    );
}
