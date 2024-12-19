"use client";

import { HistoryProvider } from "@/components/historyContext";

export default function UploadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HistoryProvider>{children}</HistoryProvider>;
}
