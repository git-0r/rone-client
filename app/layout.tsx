"use client";

import Navigation from "@/components/navigation";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { satoshi } from "./styles/fonts";
import { HistoryProvider } from "@/components/historyContext";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <HistoryProvider>
          <body
            className={`${satoshi.className} font-bold antialiased mx-2 h-screen`}
          >
            <Navigation />
            {children}
            <Toaster richColors />
          </body>
        </HistoryProvider>
      </UserProvider>
    </html>
  );
}
