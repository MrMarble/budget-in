import dayjs from "dayjs";

import { Transaction, TransactionType } from "../../../types/Transaction";
import { parseTransaction } from "./parseTransaction";

describe("parseTransaction", () => {
  const _TRANSACTION: Transaction = {
    id: "",
    type: TransactionType.INCOME,
    name: "transaction",
    amount: 123,
    repeat: true,
    startDate: "",
    endDate: "",
  };
  it("Should return 0 when date is outside range", () => {
    const date = dayjs();

    const parsed = parseTransaction(_TRANSACTION, date);

    expect(parsed).toBe(0);
  });

  describe("When 'repeat' is false", () => {
    const TRANSACTION: Transaction = { ..._TRANSACTION, repeat: false };

    it("Should return transaction amount when startDate is same as date", () => {
      const date = dayjs();

      const parsed = parseTransaction(
        { ...TRANSACTION, startDate: date.toString() },
        date
      );

      expect(parsed).toBe(TRANSACTION.amount);
    });

    it("Should return 0 when startDate and date are different", () => {
      const date = dayjs();

      const parsed = parseTransaction(
        { ...TRANSACTION, startDate: date.add(1, "month").toString() },
        date
      );

      expect(parsed).toBe(0);
    });
  });

  describe("When 'repeat' is true", () => {
    const TRANSACTION: Transaction = { ..._TRANSACTION, repeat: true };

    it("Should return transaction amount when start date is same as date", () => {
      const date = dayjs();

      const parsed = parseTransaction(
        { ...TRANSACTION, startDate: date.toString() },
        date
      );

      expect(parsed).toBe(TRANSACTION.amount);
    });

    it("Should return transaction amount when date is after start date", () => {
      const date = dayjs().add(1, "month");
      const startDate = dayjs().toString();

      const parsed = parseTransaction({ ...TRANSACTION, startDate }, date);

      expect(parsed).toBe(TRANSACTION.amount);
    });

    it("Should return transaction amount when date is between startDate and endDate", () => {
      const startDate = dayjs().toString();
      const date = dayjs().add(1, "month");
      const endDate = dayjs().add(2, "month").toString();

      const parsed = parseTransaction(
        { ...TRANSACTION, startDate, endDate },
        date
      );

      expect(parsed).toBe(TRANSACTION.amount);
    });
  });
});
