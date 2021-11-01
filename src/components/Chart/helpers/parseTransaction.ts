import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { Transaction } from "./../../../types/Transaction";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const parseTransaction = (
  { amount, startDate, endDate, repeat }: Transaction,
  date: ReturnType<typeof dayjs>
) => {
  if (date.isSame(startDate, "month")) {
    return amount;
  }

  if (
    repeat &&
    (date.isSameOrAfter(startDate, "month") ||
      (endDate && date.isBetween(startDate, endDate, "month", "[]")))
  ) {
    return amount;
  }
  return 0;
};
