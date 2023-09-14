"use client";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState, useEffect } from "react";

const MobileSidebar = () => {
  // This is a hack to solve hyderation problem
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
  setIsMounted(true);
  },[])
  // sidebar
  if (!isMounted) return null;
    return (
        <Sheet>
        <SheetTrigger>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar  />
        </SheetContent>
      </Sheet>
    )
}
export default MobileSidebar;