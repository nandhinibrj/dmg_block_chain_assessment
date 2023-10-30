import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  dialogWidth: DialogProps["maxWidth"];
  setOpen: (open: boolean) => void;
  titleSection: React.ReactNode;
  content: React.ReactNode;
  action: React.ReactNode;
};
const DialogModal: React.FC<Props> = ({
  open,
  dialogWidth,
  setOpen,
  titleSection,
  content,
  action,
}) => {
  return (
    <Dialog
      maxWidth={dialogWidth}
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="open-dialog-modal"
    >
      <DialogTitle>{titleSection}</DialogTitle>
      <DialogContent> {content}</DialogContent>
      <DialogActions>{action}</DialogActions>
    </Dialog>
  );
};

export default React.memo(DialogModal);
