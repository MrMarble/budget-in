import { TransactionType } from "./../../types/Transaction";
import getColumns from "./helpers/getColumns";
import { useStore } from "../../store/useStore";
import uid from "tiny-uid";

export default function useTransactionTable() {
  const rows = useStore((store) => store.transactions);
  const addRow = useStore((store) => store.addTransaction);

  const cols = getColumns();

  const handleAdd = () => {
    const id = uid();
    addRow({
      id,
      name: id,
      amount: 0,
      type: TransactionType.EXPENSE,
    });
  };

  return { rows, cols, handleAdd };
}
