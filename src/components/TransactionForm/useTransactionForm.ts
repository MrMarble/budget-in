import dayjs from "dayjs";
import { Transaction, TransactionType } from "./../../types/Transaction";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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
      setValue(name as keyof Transaction, value);
    });
  }

  useEffect(() => reset(), [isOpen, reset]);

  return {
    control,
    handleSubmit,
    register,
    kind,
  };
}
