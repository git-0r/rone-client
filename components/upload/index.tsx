"use client";

import React, { useState, useRef } from "react";
import { FileUp, Download, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Claims } from "@auth0/nextjs-auth0";
import History from "../history";
import { useHistory } from "../historyContext";
import { toast } from "sonner";

type Result = {
  id: string;
  text: string;
  createdAt: string;
};

type Props = {
  user?: Claims;
  token?: string;
  results?: Result[];
  onUploadSuccess?: (result: Result) => void;
};

const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit

export default function Upload({ user, token }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { addHistory } = useHistory();

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const selectedFile = files[0];
    if (selectedFile.type.startsWith("audio/")) {
      setFile(selectedFile);
    } else {
      alert("Please upload an audio file.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsUploading(true);

    e.preventDefault();

    try {
      if (!user || !token) {
        throw new Error("Not authorized.");
      }

      if (!file) {
        throw new Error("Please select a file first.");
      }

      if (file.size > fileSizeLimit) {
        throw new Error("File size exceeds the 5MB limit.");
      }

      const formData = new FormData();
      formData.append("email", `${user.email}`);
      formData.append("audio", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        addHistory(result.data);
        setFile(null);
        toast.success(result.message);
      } else {
        throw new Error("Failed to upload file.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message);
      } else {
        toast.error("An error occurred while uploading the file.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const openFileSelector = () => {
    inputRef.current?.click();
  };

  return (
    <div className="grid grid-cols-1 gap-6 w-full max-w-4xl mx-auto pt-8">
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
              ${
                dragActive
                  ? "border-likeBlue bg-likeBlue/10"
                  : "border-gray-300 hover:border-likeBlue"
              }
            `}
          >
            <input
              type="file"
              ref={inputRef}
              accept="audio/wav"
              onChange={handleChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-4">
              <FileUp
                size={48}
                className={`
                  text-gray-400 transition-colors duration-300
                  ${dragActive ? "text-likeBlue" : "text-gray-400"}
                `}
              />
              <p className="text-sm text-gray-600">
                {file
                  ? `Selected: ${file.name}`
                  : "Drag and drop an audio file or click to select. Maximum file size: 5MB."}
              </p>
              <Button
                type="button"
                onClick={openFileSelector}
                variant="outline"
                className="border-likeBlue text-likeBlue hover:bg-likeBlue/10"
              >
                <Download className="mr-2" size={16} /> Select File
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-likeBlue hover:bg-likeBlue/90 min-w-36"
              disabled={!file || isUploading}
            >
              {isUploading ? (
                <Loader className="animate-spin" />
              ) : (
                "Upload Audio"
              )}
            </Button>
          </div>
        </form>
      </div>
      <History />
    </div>
  );
}
