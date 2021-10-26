import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import TransactionForm from "../TransactionForm";
import useTransactionTable from "./useTransactionTable";
export interface TransactionTableProps {
  useHook?: typeof useTransactionTable;
}

export default function TransactionTable({
  useHook = useTransactionTable,
}: TransactionTableProps) {
  const {
    rows,
    cols,
    handleEdit,
    isOpen,
    onSubmit,
    onClose,
    selectedTransaction,
  } = useHook();

  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={cols}
        autoHeight
        onCellDoubleClick={handleEdit}
      />
      <TransactionForm
        isOpen={isOpen}
        title="Edit Transaction"
        onSubmit={onSubmit}
        onClose={onClose}
        initialValues={selectedTransaction}
      />
    </Box>
  );
}
