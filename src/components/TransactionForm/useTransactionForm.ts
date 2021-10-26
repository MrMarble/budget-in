import { Transaction, TransactionType } from "./../../types/Transaction";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function useTransactionForm(
  isOpen: boolean = false,
  initialValues?: Transaction
) {
  const { control, handleSubmit, register, reset, setValue } =
    useForm<Transaction>();

  if (initialValues) {
    Object.entries(initialValues).forEach(([name, value]) => {
      setValue(name as keyof Transaction, value);
    });
  }

  useEffect(() => reset(), [isOpen, reset]);

  return { control, handleSubmit, register };
}
