// import { UserProvider } from "@auth0/nextjs-auth0/client";
import { HistoryProvider } from "@/components/historyContext";

export default function UploadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <UserProvider>
    <HistoryProvider>{children}</HistoryProvider>
    // </UserProvider>
  );
}
