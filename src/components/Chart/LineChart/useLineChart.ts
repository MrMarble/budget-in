import type { ChartData } from "chart.js";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { getRandomColor } from "../../../helpers/getRandomColor";
import { useStore } from "./../../../store/useStore";
import { Transaction, TransactionType } from "./../../../types/Transaction";
import { parseTransaction } from "./../helpers/parseTransaction";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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
