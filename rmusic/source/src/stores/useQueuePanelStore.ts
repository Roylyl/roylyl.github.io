import { create } from 'zustand';

export const useQueuePanelStore = create<{ isOpen: boolean; setOpen: (open: boolean) => void }>(set => ({
    isOpen: false,
    setOpen: isOpen => set({ isOpen }),
}));
