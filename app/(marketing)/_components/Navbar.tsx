"use client";

import { cn } from "@/lib/utils";
import Logo from "./Logo";
import useScrollTop from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/ModeToggle";

const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <nav
      className={cn(
        "fixed top-0 z-50 bg-background dark:bg-[#1F1F1F] flex items-center w-full py-1 px-6 ease-in",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="hidden md:block w-[150px]">
        <Logo />
      </div>
      <div className="w-full flex items-center gap-x-2 md:ml-auto md:justify-end">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
