import { FormatColorReset } from "@mui/icons-material";
import { Button } from "@mui/material";
import type { Meta } from "@storybook/react";
import { useState } from "react";
import Modal from "./Modal";

export const Default = ({
  title,
  content,
  onClose,
}: {
  title: string;
  content: string;
  onClose: (accepted: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = (accepted: boolean) => {
    onClose(accepted);
    setOpen(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal isOpen={open} onClose={handleClose} title={title}>
        <p>{content}</p>
      </Modal>
    </>
  );
};

export const WithAccept = ({
  title,
  content,
  acceptButtonText,
  onClose,
}: {
  title: string;
  content: string;
  acceptButtonText: string;
  onClose: (accepted: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = (accepted: boolean) => {
    onClose(accepted);
    setOpen(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={open}
        onClose={handleClose}
        title={title}
        acceptButtonText={acceptButtonText}
      >
        <p>{content}</p>
      </Modal>
    </>
  );
};

WithAccept.args = {
  acceptButtonText: "Accept",
};

export default {
  title: "Modal",
  component: Modal,
  argTypes: {
    title: {
      control: "text",
      defaultValue: "Modal Title",
    },
    content: {
      control: "text",
      defaultValue: "Modal Content",
    },
    onClose: {
      action: "clicked",
    },
  },
} as Meta;
