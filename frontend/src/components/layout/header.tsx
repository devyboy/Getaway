
"use client"

import { useAuth } from "@/app/features/auth/auth-context";
import Link from "next/link";

export type HeaderLink = {
    label: string,
    href: string
}

export default function Header({ links }: { links: HeaderLink[] }) {
    const { status } = useAuth()


    return <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur dark:bg-black/95">
        <nav
            aria-label="Main navigation"
            className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
        >
            <Link className="font-heading text-lg font-semibold" href="/">
                Getaway
            </Link>
            <div className="flex items-center gap-4 text-sm">
                {links.map(({ href, label }) =>
                    <Link className="hover:underline" href={href} key={href}>
                        {label}
                    </Link>)}

                {status === "authenticated" &&
                    <>
                        <Link className="hover:underline" href="/profile">
                            Profile
                        </Link>
                        <Link className="hover:underline" href="/logout">
                            Logout
                        </Link>
                    </>
                }

                {status === "unauthenticated" &&
                    <Link className="hover:underline" href="/login">
                        Login
                    </Link>
                }
            </div>
        </nav>
    </header>
}