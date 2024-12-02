"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, Trash2, UserCircle } from "lucide-react";
import Link from "next/link";

export default function Account() {
  const { user, error, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="animate-spin stroke-likeBlue" />
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <main className="h-[calc(100vh-4rem)] flex items-center">
      {user && (
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="mx-auto size-24">
              <AvatarImage
                src={user.picture || "https://github.com/shadcn.png"}
                alt={user.name || "avatar"}
              />
              <AvatarFallback>
                <UserCircle size={100} className="text-likeBlue stroke-1" />
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {user?.name || "User Profile"}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div className="flex flex-col w-full space-y-3">
              <Button
                asChild
                variant="outline"
                className="w-full border-likeBlue text-likeBlue hover:bg-likeBlue/10"
              >
                <Link href="/api/auth/logout">
                  <LogOut className="mr-2" size={16} /> Logout
                </Link>
              </Button>

              <Button
                // onClick={onDeleteAccount}
                variant="destructive"
                className="w-full bg-red-500 hover:bg-red-600"
              >
                <Trash2 className="mr-2" size={16} /> Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
