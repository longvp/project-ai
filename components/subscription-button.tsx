"use client";

import { Sparkles } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface IProps {
  isProPlan?: boolean;
  className?: string;
}

const SubscriptionButton: React.FC<IProps> = ({ isProPlan, className }) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    // to do something
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/stripe");
      location.href = data?.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <Button
        variant="outline"
        size="lg"
        disabled={isLoading}
        onClick={() => handleSubscribe()}
        className={cn(
          "text-white w-full font-semibold border-none gradient-btn",
          "hover:text-white"
        )}
      >
        <span>{isProPlan ? "Manage Subscription" : "Upgrade to Pro"}</span>
        <Sparkles />
      </Button>
    </div>
  );
};

export default SubscriptionButton;
