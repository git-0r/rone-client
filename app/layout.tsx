import Navigation from "@/components/navigation";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { satoshi } from "./styles/fonts";
import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transcribe Audio in Seconds",
  description:
    "AI-powered transcription that turns your audio files into accurate, searchable text with one click.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`${satoshi.className} font-bold antialiased mx-2 h-screen`}
        >
          <Navigation />
          {children}
          <Toaster richColors />
        </body>
      </UserProvider>
    </html>
  );
}
