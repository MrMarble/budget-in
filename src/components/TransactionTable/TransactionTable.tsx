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
    <Paper sx={{ borderRadius: "16px", padding: "1.5rem" }} elevation={3}>
      <Box mb={2}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
          component="span"
          mr={1}
        >
          Transactions
        </Typography>
        <Button>Add</Button>
      </Box>
      <Box>
        <DataGrid rows={rows} columns={cols} autoHeight />
      </Box>
    </Paper>
  );
}
