"use client"

import Link from "next/link"

export default function ErrorPage({ error, retry }: {
    error: Error & { digest?: string }
    retry: () => void
}) {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <h1>Could not load this trip</h1>
                <p>Please check your connection and try again.</p>
                <button onClick={() => retry()} className="text-orange-500">
                    Try again
                </button>
                <Link className="text-purple-500" href="/trips">
                    Back to trips
                </Link>
            </main>
        </div>
    )
}
