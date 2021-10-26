import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import useTransactionTable from "./useTransactionTable";
export interface TransactionTableProps {
  useHook?: typeof useTransactionTable;
}

export default function TransactionTable({
  useHook = useTransactionTable,
}: TransactionTableProps) {
  const { rows, cols } = useHook();

  return (
    <Box>
      <DataGrid rows={rows} columns={cols} autoHeight />
    </Box>
  );
}
