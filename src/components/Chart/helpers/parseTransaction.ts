import dayjs from "dayjs";
import { Transaction } from "./../../../types/Transaction";

export const parseTransaction = (
  { amount, startDate, endDate, repeat }: Transaction,
  date: ReturnType<typeof dayjs>
) => {
  if (startDate && endDate) {
    if (date.isBetween(startDate, endDate, "month", "[]")) {
      return amount;
    }
  } else if (startDate && !endDate) {
    if (repeat && date.isSameOrAfter(startDate, "month")) {
      return amount;
    }
    if (date.isSame(startDate, "month")) {
      return amount;
    }
  } else if (!startDate && endDate) {
    if (date.isSameOrBefore(endDate, "month")) {
      return amount;
    }
  }
  return 0;
};
