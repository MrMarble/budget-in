import { Transaction, TransactionType } from "./../../types/Transaction";
import { useStore } from "./../../store/useStore";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import type { ChartData } from "chart.js";
import { getRandomColor } from "../../helpers/getRandomColor";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const parseTransaction = (
  { amount, startDate, endDate }: Transaction,
  date: ReturnType<typeof dayjs>
) => {
  console.log(amount);
  if (startDate && endDate) {
    if (date.isBetween(startDate, endDate, "month", "[]")) {
      return amount;
    }
  } else if (startDate && !endDate) {
    if (date.isSameOrAfter(startDate, "month")) {
      return amount;
    }
  } else if (!startDate && endDate) {
    if (date.isSameOrBefore(endDate, "month")) {
      return amount;
    }
  }
  return 0;
};

const parseTransactions = (
  t: Transaction[],
  date: ReturnType<typeof dayjs>
) => {
  return t.reduce((acc, t) => acc + parseTransaction(t, date), 0);
};

const getMonths = () =>
  new Array(12).fill(0).map((_, i) => dayjs().month(i).format("MMM"));

export const useLineChart = () => {
  const transactions = useStore((store) => store.transactions);
  console.log(transactions);
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
