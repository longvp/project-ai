import UpgradeProModal from "@/components/dashboard/upgrade-pro-modal";
import Sidebar from "@/components/sidebar";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import TopBar from "@/components/topbar";
import { checkSubscription, getUserLimitCount } from "@/lib/user-limit";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const isProPlan = await checkSubscription();
  const userLimitCount = await getUserLimitCount();

  return (
    <div>
      <header>
        <TopBar />
      </header>
      <main
        className={cn(
          "lg:bg-gray-950 lg:overflow-hidden lg:pl-80 lg:pr-7 lg:py-7 [&:has([is-navbar-minimal])]:lg:pl-20"
        )}
      >
        <Sidebar
          userLimitCount={userLimitCount}
          isProPlan={isProPlan}
          className={cn(
            "fixed left-0 z-20 w-80 hidden [&:has([is-navbar-minimal])]:w-fit",
            "lg:block"
          )}
        />
        <MobileSidebar userLimitCount={userLimitCount} isProPlan={isProPlan} />
        <UpgradeProModal isProPlan={isProPlan} />
        <div
          className={cn(
            "bg-background h-[calc(100vh-56px)]",
            "lg:rounded-3xl lg:p-7"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
