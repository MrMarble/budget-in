import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Transaction, TransactionType } from "./../../types/Transaction";

export default function useTransactionForm(
  isOpen: boolean = false,
  initialValues?: Transaction
) {
  const { control, handleSubmit, register, reset, watch } =
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

  useEffect(() => reset(), [isOpen, reset]);

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return {
    control,
    handleSubmit,
    register,
    kind,
  };
}
