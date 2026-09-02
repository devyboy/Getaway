import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>GetAway</h1>
        <h2>Plan and track your vacations</h2>
        <Link className="text-purple-500" href='/trips'>See trips</Link>
      </main>
    </div>
  );
}
