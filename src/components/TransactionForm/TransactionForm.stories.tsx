import { Button } from "@mui/material";
import type { Meta } from "@storybook/react";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Transaction } from "../../types/Transaction";
import TransactionForm, { TransactionFormProps } from "./TransactionForm";

export const Default = ({
  title,
  text,
  onClose,
  onSubmit,
}: TransactionFormProps) => {
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit: SubmitHandler<Transaction> = (data) => {
    setOpen(false);
    onSubmit(data);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <TransactionForm
        isOpen={isOpen}
        title={title}
        text={text}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default {
  title: "Transaction Form",
  component: TransactionForm,
  argTypes: {
    title: {
      control: "text",
      defaultValue: "Modal Title",
    },
    text: {
      control: "text",
    },
    onClose: {
      action: "close",
    },
    onSubmit: {
      action: "submit",
    },
  },
} as Meta;
