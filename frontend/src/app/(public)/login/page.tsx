"use client";

import { useAuth } from "@/app/features/auth/auth-context";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export default function Login() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { refreshUser } = useAuth()

    async function handleFormSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(event.currentTarget)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData.entries()))
            });

            if (!response.ok) {
                toast.add({
                    title: "Unable to login",
                    description: "Invalid username or password",
                    type: "error",
                });
                return
            }
            refreshUser()
            router.push("/")
        } catch (error) {
            console.error("Failed to login", error)
            toast.add({
                title: "Unable to login",
                description: "Please check your connection and try again.",
                type: "error",
            });
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleFormSubmit}>
                <FormInput name="email" placeholder="Email" required />
                <FormInput name="password" placeholder="Password" required />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>
            </form>
        </>
    );
}
