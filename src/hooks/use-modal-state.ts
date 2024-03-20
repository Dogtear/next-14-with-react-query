import { Task } from "@/db/schema";
import { unknown } from "zod";
import { create } from "zustand";

export interface IUseModalStore<T> {
  isOpen: boolean;
  editData?: T;
  onOpen: () => void;
  onClose: () => void;
  onEditData: (task: T) => void;
}

export const useModalState = create<IUseModalStore<unknown>>((set) => ({
  isOpen: false,
  editData: undefined,
  onOpen: () => set({ isOpen: true, editData: undefined }),
  onClose: () => set({ isOpen: false, editData: undefined }),
  onEditData: (task) => set({ editData: task, isOpen: true }),
}));
