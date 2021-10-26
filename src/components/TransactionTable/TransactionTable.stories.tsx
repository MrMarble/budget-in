import TransactionTable from ".";
import type { TransactionTableProps } from "./TransactionTable";
import type { Meta, Story } from "@storybook/react";
import getColumns from "./helpers/getColumns";
import { Transaction, TransactionType } from "../../types/Transaction";
import { GridCellParams } from "@mui/x-data-grid";

interface StoryProps extends TransactionTableProps {
  mockRows: number;
}

let rows: Transaction[] = [];

const useTransactionTable = () => ({
  rows,
  cols: getColumns(),
  handleEdit: ({ id }: GridCellParams) => {
    return;
  },
  isOpen: false,
  onSubmit: () => {
    return;
  },
  onClose: () => {
    return;
  },
  selectedTransaction: undefined,
});

const Template: Story<StoryProps> = (args) => {
  rows = new Array(args.mockRows).fill(0).map((_, i) => ({
    id: i + "",
    name: `test ${i}`,
    amount: i,
    type: i % 2 === 0 ? TransactionType.INCOME : TransactionType.EXPENSE,
  }));
  return <TransactionTable {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  useHook: useTransactionTable,
};

export default {
  title: "Transaction Table",
  component: TransactionTable,
  argTypes: {
    mockRows: {
      name: "Number of rows",
      defaultValue: 2,
      control: "number",
    },
  },
} as Meta;
