import { SubmitHandler } from "react-hook-form";
import { Transaction } from "./../../types/Transaction";
import { useState } from "react";
import getColumns from "./helpers/getColumns";
import { useStore } from "../../store/useStore";
import type { GridCellParams } from "@mui/x-data-grid";

export default function useTransactionTable() {
  const rows = useStore((store) => store.transactions);

  const [isOpen, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();

  const cols = getColumns();

  const handleEdit = ({ id }: GridCellParams) => {
    const transaction = rows.find((r) => r.id === id);
    if (transaction) {
      setSelectedTransaction(transaction);
      setOpen(true);
    }
  };

  const onSubmit: SubmitHandler<Transaction> = (t) => {
    useStore.setState({
      transactions: [...rows.filter((prev) => prev.id !== t.id), t],
    });
    setOpen(false);
  };

  const onClose = () => setOpen(false);
  return {
    rows,
    cols,
    handleEdit,
    isOpen,
    onSubmit,
    onClose,
    selectedTransaction,
  };
}
