"use client"

import Link from "next/link"

export default function ErrorPage({ error, retry }: {
    error: Error & { digest?: string }
    retry: () => void
}) {
    return (
        <>
            <h1>Could not load this trip</h1>
            <p>Please check your connection and try again.</p>
            <button onClick={() => retry()} className="text-orange-500">
                Try again
            </button>
            <Link className="text-purple-500" href="/trips">
                Back to trips
            </Link>
        </>
    )
}
