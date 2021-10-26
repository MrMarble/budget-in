import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface ModalProps {
  isOpen: boolean;
  onClose: (accepted: boolean) => void;
  children: React.ReactNode;
  title?: string;
  acceptButtonText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  acceptButtonText,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {acceptButtonText && (
          <Button onClick={() => onClose(true)}>{acceptButtonText}</Button>
        )}
        <Button onClick={() => onClose(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
