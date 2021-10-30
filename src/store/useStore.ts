import create from "zustand";
import { persist } from "zustand/middleware";
import { Transaction } from "../types/Transaction";
import { storage } from "./storage";
interface Store {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

export const useStore = create<Store>(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (transaction: Transaction) =>
        set((prev) => ({ transactions: [...prev.transactions, transaction] })),
    }),
    {
      name: "gun-storage",
      getStorage: () => storage,
    }
  )
);
