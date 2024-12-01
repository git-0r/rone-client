"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEventHandler } from "react";
import { figtree } from "../styles/fonts";
import { useUser } from "@auth0/nextjs-auth0/client";
// import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  // const { toast } = useToast();
  const { user } = useUser();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    if (!user) return;

    const form = event.target as HTMLFormElement;
    const file = (form.elements[0] as HTMLInputElement).files?.[0];

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("email", `${user.email}`);
    formData.append("audio", file);

    try {
      // TODO => use react query
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // const result = await response.json();
        // toast({
        //   title: "File uploaded successfully",
        //   description: `path: ${result.text}`,
        // });
        // alert(`File uploaded successfully: ${result.filePath}`);
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={
          "h-[calc(100vh-3.5rem)] w-full flex items-center justify-center " +
          figtree.className
        }
      >
        <div className="w-full max-w-sm space-y-4">
          <Label htmlFor="audio" className="font-semibold text-lg">
            Upload Audio File:
          </Label>
          <div className="flex items-center gap-4">
            <Input id="audio" type="file" accept="audio/*" name="audio" />
            <Button type="submit">Upload</Button>
          </div>
        </div>
      </form>
      {/* <History /> */}
    </>
  );
}
