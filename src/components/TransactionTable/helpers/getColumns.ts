import type { GridColDef } from "@mui/x-data-grid";
import camelToCapitalize from "../../../helpers/camelToCapitalize";
import { Transaction, TransactionType } from "../../../types/Transaction";
interface Props {
  filter?: [keyof Transaction, string];
}

// Update when needed
const transaction: Transaction = {
  id: "",
  name: "",
  type: TransactionType.INCOME,
  amount: 0,
  startDate: null,
  endDate: null,
  repeat: true,
};

type transactionKeys = keyof Transaction;

export default function getColumns(
  filter: transactionKeys[] = ["id", "repeat"] //TODO: ignore repeat when updating the table
): GridColDef[] {
  return Object.keys(transaction)
    .filter((key) => !filter || !filter.includes(key as keyof Transaction))
    .map((key) => ({
      field: key,
      headerName: camelToCapitalize(key),
      align:
        typeof transaction[key as keyof Transaction] === "number"
          ? "center"
          : "left",
      valueFormatter: ({ field, value }) =>
        field === "amount" ? `${value} €` : value,
    }));
}
