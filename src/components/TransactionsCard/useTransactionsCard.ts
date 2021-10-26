import { Transaction } from "./../../types/Transaction";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useStore } from "../../store/useStore";

export default function useTransactionsCard() {
  const [isOpen, setOpen] = useState(false);
  const addRow = useStore((store) => store.addTransaction);

  const handleClick = () => setOpen(true);

  const onSubmit: SubmitHandler<Transaction> = (data) => {
    setOpen(false);
    addRow(data);
  };
  const onClose = () => setOpen(false);

  return { isOpen, handleClick, onSubmit, onClose };
}
