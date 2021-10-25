export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export type Transaction = {
  id: string;
  type: TransactionType;
  name: string;
  amount: number;
};
