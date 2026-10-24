"use client";

import { useAuth } from "@/app/features/auth/auth-context";
import { API_URL } from "@/lib/api/api-client";
import { useEffect, useState } from "react";

type LogoutStatus = "loading" | "error";

export default function Logout() {
    const { refreshUser } = useAuth();
    const [status, setStatus] = useState<LogoutStatus>("loading");

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch(`${API_URL}/auth/logout`, {
                    method: "POST",
                    credentials: "include",
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Logout request failed.");
                }

                // Synchronize the frontend's authentication state.

                // No success state because the route is protected 
                // and will auto navigate to /login on auth sync
                refreshUser();
            } catch {
                setStatus("error");
            }
        };

        logout();
    }, [refreshUser]);

    return (
        <>
            {status === "loading" && (
                <p>Logging you out...</p>
            )}

            {status === "error" && (
                <p>
                    There was a problem logging you out.
                    Please refresh the page to try again.
                </p>
            )}
        </>
    );
}