import { parseTransaction } from "./../helpers/parseTransaction";
import { Transaction, TransactionType } from "./../../../types/Transaction";
import { useStore } from "./../../../store/useStore";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import type { ChartData } from "chart.js";
import { getRandomColor } from "../../../helpers/getRandomColor";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const getMonths = () =>
  new Array(12).fill(0).map((_, i) => dayjs().month(i).format("MMM"));

export const useBarChart = () => {
  const transactions = useStore((store) => store.transactions);

  const data: ChartData<"bar"> = {
    labels: getMonths(),
    datasets: transactions.map((t) => ({
      stack: t.type,
      label: t.name,
      backgroundColor: getRandomColor(
        t.type === TransactionType.INCOME ? "#77DD77" : "#FF6961"
      ),
      data: getMonths().map((_, i) => parseTransaction(t, dayjs().month(i))),
    })),
  };
  return { data };
};
