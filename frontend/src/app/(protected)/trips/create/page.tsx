"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEvent } from "react";
import { toast } from "@/components/ui/toast";
import FormInput from "@/components/ui/formInput";
import { ApiError } from "@/lib/api/apiError";

function getLocalDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export default function Trips() {
    const router = useRouter();
    const today = getLocalDateString();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleFormSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const tripName = formData.get("name")?.toString() ?? "";

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Object.fromEntries(formData.entries())),
            });

            if (!response.ok) {
                throw new Error(`Failed to create trip (HTTP ${response.status})`);
            }

            toast.add({
                title: "Trip created",
                description: tripName,
            });

            router.push("/trips");
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                router.replace("/login");
                return;
            }

            console.error("Failed to create trip", error);
            toast.add({
                title: "Unable to create trip",
                description: "Please check your connection and try again.",
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <>
            <h1>Create trip</h1>
            <form onSubmit={handleFormSubmit}>
                <FormInput name="name" required />
                <FormInput name="destination" required />
                <FormInput name="startDate" defaultValue={today} type="date" required />
                <FormInput name="endDate" defaultValue={today} type="date" required />
                <button className="text-purple-500" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create"}
                </button>
            </form>
        </>
    );
}
