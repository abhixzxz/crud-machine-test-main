import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ReadModal = ({ isOpen, onClose, company }) => {
  // Add a null check here
  if (!company) return null;

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
          Company Details
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Name: {company.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Email: {company.email}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Website: {company.website}
        </Typography>
        <img
          style={{
            height: 150,
            width: 150,
            borderRadius: "50%",
            margin: "auto",
            display: "block",
            marginBottom: 20,
          }}
          src={company.logo}
          alt="Company Logo"
        />
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ReadModal;
