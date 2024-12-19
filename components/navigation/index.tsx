"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const items = [
  {
    title: "Upload",
    href: "/upload",
    description: "upload audio",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-b-likeBlue/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <div className="hidden md:flex md:items-center md:justify-between md:w-full">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="ml-4 hidden font-bold sm:inline-block text-3xl text-likeBlue">
              r.one
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {items.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    href={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === item.href && "text-primary",
                      "font-bold"
                    )}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              {!isLoading ? (
                user ? (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/account"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === "/account" && "text-primary",
                        "font-bold"
                      )}
                    >
                      Account
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/api/auth/login"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === "/api/auth/login" && "text-primary",
                        "font-bold"
                      )}
                    >
                      Login
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              ) : (
                <Button disabled className="md:w-[5.5rem]" variant="link">
                  <Loader2 className="animate-spin" />
                </Button>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setIsOpen}
            >
              <span className="font-bold">r.one</span>
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {items.map((item) => (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setIsOpen}
                  >
                    {item.title}
                  </MobileLink>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: MobileLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        isActive && "text-foreground",
        className
      )}
    >
      {children}
    </Link>
  );
}
