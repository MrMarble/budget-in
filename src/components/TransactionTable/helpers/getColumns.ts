import { Chip } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import React from "react";

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

const columns: { [key: transactionKeys]: Partial<GridColDef> } = {
  amount: {
    align: "center",
    type: "number",
    valueFormatter: ({ value }) => `${value} €`,
  },
  startDate: {
    type: "date",
  },
  endDate: {
    type: "date",
  },
  type: {
    renderCell: ({ value }) =>
      React.createElement(Chip, {
        color: value === TransactionType.INCOME ? "success" : "error",
        label: value,
      }),
  },
};

export default function getColumns(
  filter: transactionKeys[] = ["id", "repeat"] //TODO: ignore repeat when updating the table
): GridColDef[] {
  return Object.keys(transaction)
    .filter((key) => !filter || !filter.includes(key as keyof Transaction))
    .map((key) => ({
      field: key,
      headerName: camelToCapitalize(key),
      flex: 1,
      align: "left",
      headerAlign: "left",
      ...columns?.[key as transactionKeys],
    }));
}
