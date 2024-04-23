import { ChevronsLeft, MenuIcon } from "lucide-react";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import UserItem from "./UserItem";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(()=> {
    if(isMobile) collapse();
    else resetWidth();
  }, [isMobile]);

  useEffect(()=> {
    if(isMobile) collapse();
  }, [pathname, isMobile]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if(!isResizingRef.current) return;

    let newWidth = e.clientX;

    if(newWidth < 240) newWidth = 240;
    if(newWidth > 480) newWidth = 480;

    if(sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth})px`);
    };
  };

  const handleMouseUp = ()=> {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if(sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile?"100%" :"240px";
      navbarRef.current.style.setProperty(
      "width",
      isMobile ? "0" : "calc(100% - 240px)")

      navbarRef.current.style.setProperty(
      "left", 
      isMobile ? "100%" : "240px")

      setTimeout(()=> setIsResetting(false), 300);
    };
  };

  const collapse = ()=> {
    if(sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";

      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(()=> setIsResetting(false), 300);
    };
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar relative z-[99999] flex flex-col bg-secondary overflow-y-auto w-60",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "w-6 h-6 text-muted-foreground absolute top-3 right-2 transition opacity-0 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 group-hover/sidebar:opacity-100",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>
        <div>
          <UserItem />
        </div>
        <div className="mt-4">
          <p>documents</p>
        </div>
        <div 
        onMouseDown={handleMouseDown}
        onClick={resetWidth}
        className="bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize h-full w-1 absolute top-0 right-0" 
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "w-[clac(100% - 240px)] absolute top-0 left-60 z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-full left-0"
        )}
      >
        <nav className="w-full bg-transparent px-3 py-2">
          {isCollapsed && (
            <MenuIcon
              role="button"
              onClick={resetWidth}
              className="w-6 h-6 text-muted-foreground "
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
