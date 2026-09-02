"use client";

import { useRouter } from "next/navigation";
import { useState, type InputHTMLAttributes } from "react";
import { toast } from "@/components/ui/toast"
import Link from "next/link";

type FormState = {
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
};


function FormInput({ type = "text", ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className="block border border-solid"
            type={type}
            {...rest}
        />
    );
}


export default function Trips() {
    const router = useRouter();

    const today = new Date().toISOString().slice(0, 10);

    const [formState, setFormState] = useState<FormState>({
        name: "",
        destination: "",
        startDate: today,
        endDate: today,
    });


    async function handleFormSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        });

        if (!response.ok) {
            throw new Error("Failed to create trip")
        }

        router.push("/trips");
        toast.add({
            title: "Trip created",
            description: formState.name
        })
    }

    function handleFormChange(event: React.ChangeEvent<HTMLFormElement>) {
        const input = event.target;

        if (!(input instanceof HTMLInputElement)) {
            return;
        }

        const fieldName = input.name as keyof FormState;
        const fieldValue = input.value;

        setFormState((previousState) => ({
            ...previousState,
            [fieldName]: fieldValue
        }));
    }


    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <Link className="text-purple-500" href="/trips">Back</Link>
                <h1>Create trip</h1>
                <form onSubmit={handleFormSubmit} onChange={handleFormChange}>
                    <FormInput name="name" defaultValue={formState.name} />
                    <FormInput name="destination" defaultValue={formState.destination} />
                    <FormInput name="startDate" defaultValue={formState.startDate} type="date" />
                    <FormInput name="endDate" defaultValue={formState.endDate} type="date" />
                    <button className="text-purple-500" type="submit">Create</button>
                </form>
            </main>
        </div>
    );
}

