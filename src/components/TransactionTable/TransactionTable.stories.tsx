import TransactionTable from ".";
import type { TransactionTableProps } from "./TransactionTable";
import type { Meta, Story } from "@storybook/react";
import getColumns from "./helpers/getColumns";
import { Transaction, TransactionType } from "../../types/Transaction";

interface StoryProps extends TransactionTableProps {
  mockRows: number;
}

let rows: Transaction[] = [];

const useTransactionTable = () => ({
  rows,
  cols: getColumns(),
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
