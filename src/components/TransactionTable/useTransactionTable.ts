import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import type { Transaction } from "./../../types/Transaction";
import { useState } from "react";
import getColumns from "./helpers/getColumns";

export default function useTransactionTable() {
  // TODO: change to final state provider
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const cols = getColumns();

  const rows: GridRowsProp = transactions;

  return { rows, cols };
}
