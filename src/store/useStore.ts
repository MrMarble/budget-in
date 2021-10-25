import create from "zustand";
import { Transaction } from "../types/Transaction";

interface Store {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

export const useStore = create<Store>((set) => ({
  transactions: [],
  addTransaction: (transaction: Transaction) =>
    set((prev) => ({ transactions: [...prev.transactions, transaction] })),
}));
