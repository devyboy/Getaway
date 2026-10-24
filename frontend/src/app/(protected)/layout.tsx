"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../features/auth/auth-context";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { status, refreshUser } = useAuth()
    const router = useRouter()

    useEffect(() => {
        console.log("status changed: ", status)
        if (status === "unauthenticated") {
            router.replace('/login')
        }
    }, [status, router])

    if (status === "loading" || status === "unauthenticated") {
        return null
    }

    if (status === "error") {
        return <>
            <p>Unable to verify session, please try again.</p>
            <Button onClick={refreshUser}>Retry</Button>
        </>
    }

    return <>{children}</>
}