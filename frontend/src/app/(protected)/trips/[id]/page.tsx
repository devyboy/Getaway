"use client";

import { getTripById, type Trip } from "@/lib/api/trips";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [trip, setTrip] = useState<Trip | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadTrip() {
            try {
                const data = await getTripById(id);
                if (isMounted) {
                    setTrip(data);
                    setStatus("success");
                }
            } catch {
                if (isMounted) {
                    setStatus("error");
                }
            }
        }

        loadTrip();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (status === "loading") {
        return <p>Loading trip...</p>;
    }

    if (status === "error") {
        return (
            <>
                <h1>Could not load this trip</h1>
                <Link className="text-purple-500" href="/trips">
                    Back to trips
                </Link>
            </>
        );
    }

    if (trip === null) {
        return (
            <>
                <h1>Trip not found</h1>
                <Link className="text-purple-500" href="/trips">
                    Back to trips
                </Link>
            </>
        );
    }

    return (
        <>
            <h1>{trip.name}</h1>
            <p>Destination: {trip.destination}</p>
            <p>Start: {trip.startDate}</p>
            <p>End: {trip.endDate}</p>
        </>
    );
}