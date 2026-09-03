import { getTripById } from "@/lib/api/trips";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const trip = await getTripById(id);

    if (!trip) {
        notFound();
    }

    const { name, destination, startDate, endDate } = trip;

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <Link className="text-purple-500" href="/trips">Back</Link>
                <h1>{name}</h1>
                <p>Destination: {destination}</p>
                <p>Start: {startDate}</p>
                <p>End: {endDate}</p>
            </main>
        </div>
    );
}