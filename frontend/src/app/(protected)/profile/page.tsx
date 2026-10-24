"use client"

import { useAuth } from "@/app/features/auth/auth-context"

export default function Profile() {
    const { user } = useAuth()

    return <>
        <h1>{user?.email}&apos;s Profile</h1>
    </>
}