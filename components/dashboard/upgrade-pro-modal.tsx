"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProModalStore } from "@/stores/pro-modal-store";
import React from "react";
import SubscriptionButton from "../subscription-button";

interface IProps {
  isProPlan?: boolean;
}

const UpgradeProModal: React.FC<IProps> = ({ isProPlan }) => {
  const { isOpen, handleCloseProModal } = useProModalStore();

  return (
    <Dialog open={isOpen}>
      <DialogContent showOverlay onClose={() => handleCloseProModal()}>
        <SubscriptionButton isProPlan={isProPlan} />
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeProModal;
