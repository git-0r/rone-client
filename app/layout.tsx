import Navigation from "@/components/navigation";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { geistMono, geistSans } from "./styles/fonts";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased mx-2 h-screen`}
        >
          <Navigation />
          {children}
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}
