import { create } from "zustand";

export interface ProModalState {
  isOpen: boolean;
  handleOpenOrCloseProModal: () => void;
  handleCloseProModal: () => void;
}

export const useProModalStore = create<ProModalState>((set) => ({
  isOpen: false,
  handleOpenOrCloseProModal: () =>
    set((state) => ({ ...state, isOpen: !state.isOpen })),
  handleCloseProModal: () => set((state) => ({ ...state, isOpen: false })),
}));
