import { DatePicker } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import uid from "tiny-uid";

import booleanToString from "../../helpers/booleanToString";
import { Transaction, TransactionType } from "../../types/Transaction";
import useTransactionForm from "./useTransactionForm";

export interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<Transaction>;
  title?: string;
  text?: string;
  initialValues?: Transaction;
}

export default function TransactionForm({
  isOpen,
  onClose,
  title,
  text,
  onSubmit,
  initialValues,
}: TransactionFormProps) {
  const { control, handleSubmit, register, kind } = useTransactionForm(
    isOpen,
    initialValues
  );
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
            defaultValue={TransactionType.EXPENSE}
            render={({ field }) => (
              <TextField
                select
                {...field}
                label="Type"
                required
                margin="normal"
                sx={{ mt: 0 }}
                defaultValue={TransactionType.EXPENSE}
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
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value || "0"))
                }
              />
            )}
          />
          <Controller
            name="repeat"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="kind-lanbel">Kind</InputLabel>
                <Select
                  labelId="kind"
                  id="kind"
                  label="Kind"
                  {...field}
                  value={booleanToString(field.value)}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                >
                  <MenuItem value="true">Recurrent</MenuItem>
                  <MenuItem value="false">One Time</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            {kind && (
              <>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Start Date"
                      {...field}
                      views={["year", "month"]}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="End Date"
                      views={["year", "month"]}
                      {...field}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              </>
            )}
            {!kind && (
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Date"
                    {...field}
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
            )}
          </Box>

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
