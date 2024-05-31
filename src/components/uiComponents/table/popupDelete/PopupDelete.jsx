import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PopupDelete({
  open,
  setOpen,
  handleClose,
  handleDelete,
}) {
  const handleConfirmDelete = () => {
    handleDelete();
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{
            color: "red",
            fontSize: "20px",
            textAlign: "center",
            padding: "10px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            margin: "40px",
          }}
          id="alert-dialog-title"
        >
          {"Are you sure! Do you want to Delete?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
