"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

type History = {
  id: string;
  email: string;
  text: string;
}[];

type Props = {
  token?: string;
};

export default function History({ token }: Props) {
  const { user, isLoading } = useUser();
  const [history, setHistory] = useState<History>([]);

  // TODO optimize this
  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: user?.email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      } else {
        console.error("failed to fetch history.");
      }
    };
    if (user && !isLoading && token) {
      fetchHistory();
    }
  }, [user, isLoading, token]);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-likeBlue">
        Previous Transcriptions
      </h3>
      {history.length === 0 ? (
        <p className="text-gray-500 text-center">No transcriptions yet</p>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {history.map((result) => (
            <div
              key={result.id}
              className="flex items-center gap-2 bg-gray-50 p-2 rounded"
            >
              <FileText size={16} className="text-likeBlue flex-shrink-0" />
              <span
                className="text-sm text-gray-700 truncate w-full font-medium"
                title={result.text}
              >
                {JSON.parse(result.text)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
