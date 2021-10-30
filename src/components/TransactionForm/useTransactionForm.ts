import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Transaction, TransactionType } from "./../../types/Transaction";

export default function useTransactionForm(
  isOpen: boolean = false,
  initialValues?: Transaction
) {
  const { control, handleSubmit, register, reset, setValue, watch } =
    useForm<Transaction>({
      defaultValues: {
        startDate: dayjs().toString(),
        endDate: null,
        type: TransactionType.EXPENSE,
        amount: 0,
        name: "",
        repeat: true,
      },
    });

  const kind = watch("repeat", true);

  if (initialValues) {
    Object.entries(initialValues).forEach(([name, value]) => {
      //setValue(name as keyof Transaction, value);
    });
  }

  useEffect(() => reset(), [isOpen, reset]);

  console.log(kind);

  return {
    control,
    handleSubmit,
    register,
    kind,
  };
}
