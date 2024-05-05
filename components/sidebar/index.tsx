"use client";

import Logo from "@/components/logo";
import Navbar from "@/components/sidebar/navbar";
import SidebarToggle from "@/components/sidebar/sidebar-toggle";
import ThemeToggle from "@/components/sidebar/theme-toggle";
import SubscriptionButton from "@/components/subscription-button";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

interface Props {
  className?: string;
  isProPlan?: boolean;
  userLimitCount: number;
}

const Sidebar: React.FC<Props> = ({ className, isProPlan, userLimitCount }) => {
  const { isMinimal } = useSidebarStore();
  const { user } = useUser();

  return (
    <div className={cn("text-white", className)}>
      <div className="h-20 pl-7 pr-6">
        <div className="flex items-center justify-between w-full">
          {!isMinimal && <Logo />}
          <SidebarToggle />
        </div>
      </div>
      <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
        <Navbar />
      </div>
      <div
        className={
          cn("px-4")
          // "fixed bottom-8 left-4 right-4",
          // "lg:left-7 lg:right-auto",
          // isMinimal && "lg:left-3"
        }
      >
        <div className="mb-4 p-4 rounded-lg bg-gray-900">
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/" />
            {!isMinimal && (
              <span className="text-sm ml-4">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            )}
          </div>
          {!isMinimal && (
            <>
              <div className="border-t border-t-gray-950 pt-2 mt-4">
                {!isProPlan && (
                  <div className="mb-4">
                    <div className="text-center mb-2 text-muted-foreground font-semibold">
                      {userLimitCount}/{MAX_FREE_COUNTS} Free generations
                    </div>
                    <Progress
                      value={(userLimitCount / MAX_FREE_COUNTS) * 100}
                      className="bg-gray-950 h-3"
                      indicatorClassName="gradient-btn"
                    />
                  </div>
                )}
              </div>
              <SubscriptionButton isProPlan={isProPlan} />
            </>
          )}
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
