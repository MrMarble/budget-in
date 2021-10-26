import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import uid from "tiny-uid";
import { Transaction, TransactionType } from "../../types/Transaction";
import useTransactionForm from "./useTransactionForm";

export interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<Transaction>;
  title?: string;
  text?: string;
}

export default function TransactionForm({
  isOpen,
  onClose,
  title,
  text,
  onSubmit,
}: TransactionFormProps) {
  const { control, handleSubmit, register } = useTransactionForm(isOpen);
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {text && <DialogContentText>{text}</DialogContentText>}
          <Controller
            name="type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                select
                {...field}
                label="Type"
                required
                margin="normal"
                fullWidth
              >
                {Object.entries(TransactionType).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                required
                margin="normal"
                fullWidth
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            defaultValue={0}
            rules={{ required: true, min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                required
                margin="normal"
                fullWidth
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            )}
          />
          <input type="hidden" value={uid()} {...register("id")} />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Submit</Button>
          <Button onClick={() => onClose()}>Close</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
