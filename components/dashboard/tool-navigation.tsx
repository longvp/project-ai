"use client";

import { TOOLS } from "@/constants";
import ToolItem from "../tool-item";

interface ToolNavigationProps {
  title?: string;
}

const ToolNavigation: React.FC<ToolNavigationProps> = ({
  title = "Unlock the power of AI",
}) => {
  return (
    <div
      className="h-full flex flex-col w-full items-center
     grow relative px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none
    2xl:py-12 lg:px-4 lg:pt-0 lg:pb-6"
    >
      <div className="text-center mb-14">
        <h3>{title}</h3>
        <p className="text-muted-foreground text-lg mt-2">
          Chat with the smartest AI - Experience the power of AI with us
        </p>
      </div>
      <div className="w-full max-w-[30.75rem] mx-auto flex flex-col gap-5">
        {TOOLS.map((tool, index) => (
          <ToolItem key={index} {...tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolNavigation;
