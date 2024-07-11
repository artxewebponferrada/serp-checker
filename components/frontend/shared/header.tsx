
"use client"

import { LocaleSwitch } from "@/components/shared/locale-switch";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { NavBar } from "./nav-bar";

export function Header() {
  const [isTop, setIsTop] = useState(true);
  const debouncedScroll = useDebounceCallback(
    () => {
      setIsTop(window.scrollY < 20);
    },
    150,
    {
      maxWait: 150,
    },
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedScroll);
    debouncedScroll();
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll]);

  return(
  <header className={cn(" w-full items-center gap-4 border-b bg-background px-4 md:px-6 z-50 h-16 transition-shadow duration-200 flex", isTop ? "shadow-none" : "shadow-sm")}>
    <NavBar />
    <div className="flex items-center justify-end gap-2 md:ml-auto text-primary">
      <LocaleSwitch />
      <ModeToggle />
    </div>
  </header>
  )
}