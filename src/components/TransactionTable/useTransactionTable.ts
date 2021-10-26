import { TransactionType } from "./../../types/Transaction";
import getColumns from "./helpers/getColumns";
import { useStore } from "../../store/useStore";
import uid from "tiny-uid";

export default function useTransactionTable() {
  const rows = useStore((store) => store.transactions);
  const addRow = useStore((store) => store.addTransaction);

  const cols = getColumns();

  return { rows, cols };
}
