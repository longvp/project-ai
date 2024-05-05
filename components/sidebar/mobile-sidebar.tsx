"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import Sidebar from ".";
import { useSidebarStore } from "@/stores/sidebar-store";

interface IProps {
  userLimitCount: number;
  isProPlan?: boolean;
}

const MobileSidebar: React.FC<IProps> = ({ userLimitCount, isProPlan }) => {
  const { isOpen } = useSidebarStore();

  return (
    <Sheet open={isOpen}>
      <SheetContent
        className="w-screen border-none bg-black p-0 pt-8"
        side="left"
      >
        <Sidebar isProPlan={isProPlan} userLimitCount={userLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
