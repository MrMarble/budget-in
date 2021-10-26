import { Transaction, TransactionType } from "./../../types/Transaction";
import { useStore } from "./../../store/useStore";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import type { ChartData } from "chart.js";
import { useCallback } from "react";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const parseTransactions = (
  t: Transaction[],
  date: ReturnType<typeof dayjs>
) => {
  return t.reduce((acc, { amount, startDate, endDate }) => {
    if (startDate && endDate) {
      if (date.isBetween(startDate, endDate, "month", "[]")) {
        return acc + amount;
      }
    } else if (startDate && !endDate) {
      if (date.isSameOrAfter(startDate, "month")) {
        return acc + amount;
      }
    } else if (!startDate && endDate) {
      if (date.isSameOrBefore(endDate, "month")) {
        return acc + amount;
      }
    } else {
      return acc + amount;
    }
    return acc;
  }, 0);
};

export const useLineChart = () => {
  const transactions = useStore((store) => store.transactions);

  const getMonths = useCallback(
    () => new Array(12).fill(0).map((_, i) => dayjs().month(i).format("MMM")),
    []
  );

  const data: ChartData<"line"> = {
    labels: getMonths(),
    datasets: [
      {
        label: "Incomes",
        borderColor: "green",
        backgroundColor: "green",
        tension: 0.3,
        data: getMonths().map((_, i) =>
          parseTransactions(
            transactions.filter(({ type }) => type === TransactionType.INCOME),
            dayjs().month(i)
          )
        ),
      },
      {
        label: "Expenses",
        borderColor: "red",
        backgroundColor: "red",
        tension: 0.3,
        data: getMonths().map((_, i) =>
          parseTransactions(
            transactions.filter(({ type }) => type === TransactionType.EXPENSE),
            dayjs().month(i)
          )
        ),
      },
    ],
  };
  return { data };
};
