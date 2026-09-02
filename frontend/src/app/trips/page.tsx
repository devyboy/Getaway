import { getTrips } from "@/lib/api/trips";
import Link from "next/link";

export default async function Trips() {
    const trips = await getTrips();

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <Link className="text-purple-500" href="/">Back</Link>
                <h1>View your trips here</h1>
                {trips.map(({ name, destination, id }, index) => (
                    <Link href={`/trips/${id}`} className="text-orange-500" key={index}>
                        {name}: {destination}
                    </Link>
                ))}
                <Link className="text-purple-500" href="/trips/create">Create new trip</Link>
            </main>
        </div>
    );
}
