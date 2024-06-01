import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ReadModal = ({ isOpen, onClose, employee }) => {
  // Add a null check here
  if (!employee) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Employee Details
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          First Name: {employee.firstName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Last Name: {employee.lastName}
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ReadModal;
