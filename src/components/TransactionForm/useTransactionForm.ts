import type { Transaction } from "./../../types/Transaction";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function useTransactionForm(isOpen: boolean) {
  const { control, handleSubmit, register, reset } = useForm<Transaction>();

  useEffect(() => reset(), [isOpen, reset]);

  return { control, handleSubmit, register };
}
