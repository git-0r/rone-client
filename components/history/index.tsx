"use client";

import { formatDate } from "@/lib/formatDate";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FileText, Loader } from "lucide-react";
import { useHistory } from "../historyContext";

type History = {
  id: string;
  email: string;
  text: string;
  description: string;
  createdAt: string;
}[];

export default function History() {
  const { user, isLoading } = useUser();
  const { history, loading } = useHistory(isLoading, user);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-likeBlue">
        Previous Transcriptions
      </h3>
      {loading && <Loader className="animate-spin mx-auto" />}
      {history.length === 0 && !loading ? (
        <p className="text-gray-500 text-center">No transcriptions yet</p>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {history.map((result) => (
            <div
              key={result.id}
              className="flex items-center w-full gap-2 bg-gray-50 p-2 rounded"
            >
              <FileText size={16} className="text-likeBlue flex-shrink-0" />
              <span
                className="text-sm text-gray-700 truncate font-medium"
                title={result.text}
              >
                {JSON.parse(result.description)}
              </span>
              <span className="text-xs text-gray-500 ml-auto">
                {formatDate(result.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
