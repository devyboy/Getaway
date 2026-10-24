import type { Metadata } from "next";
import "./globals.css";
import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import Providers from "./providers";
import Header, { HeaderLink } from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geist = Geist({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Getaway",
  description: "Plan and track your vacations",
};

const headerLinks: HeaderLink[] = [
  { label: "Trips", href: '/trips' },
]

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full antialiased", inter.variable, geist.variable)}>
      <body className="flex min-h-screen flex-col font-sans">
        <Providers>
          <Header links={headerLinks} />
          <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-full w-full max-w-3xl flex-1 flex-col items-center bg-white px-4 py-12 dark:bg-black sm:items-start sm:px-6">
              {children}
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
