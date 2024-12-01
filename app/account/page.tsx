"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { satoshi, telma } from "../styles/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Account() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  //   TODO add breadcrumbs
  return (
    user && (
      <div
        className={
          "text-xl font-medium container max-w-screen-sm h-4/5 mx-auto my-4 space-y-2 flex flex-col justify-between " +
          satoshi.className
        }
      >
        <div className="mx-auto text-center space-y-4">
          <Avatar className="mx-auto size-36">
            <AvatarImage
              src={user.picture || "https://github.com/shadcn.png"}
              alt={user.name || "avatar"}
            />
            <AvatarFallback>x</AvatarFallback>
          </Avatar>

          <h2 className={"text-6xl " + telma.className}>{user.name}</h2>
          <p className="text-2xl">{user.email}</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button asChild variant="outline">
            <Link href="/api/auth/logout">Log out</Link>
          </Button>
          <Button variant="destructive">Delete account</Button>
        </div>
      </div>
    )
  );
}
