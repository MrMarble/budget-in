import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { useStore } from "../../store/useStore";
import { Transaction } from "../../types/Transaction";
import TransactionForm from "../TransactionForm";
import TransactionTable from "../TransactionTable";
import useTransactionsCard from "./useTransactionsCard";

export default function TransactionsCard() {
  const { handleClick, onSubmit, onClose, isOpen } = useTransactionsCard();
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
        <Button onClick={handleClick}>Add</Button>
      </Box>
      <TransactionTable />
      <TransactionForm
        isOpen={isOpen}
        title="Add Transaction"
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Paper>
  );
}
