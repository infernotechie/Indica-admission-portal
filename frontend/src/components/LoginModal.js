// src/components/LoginModal.js
import React from "react";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Login from "../pages/Login";
import './LoginStyles.css';

const LoginModal = ({ open, onClose, onLoginSuccess }) => {
  const handleLoginSuccess = () => {
    if (onLoginSuccess) onLoginSuccess();
    if (onClose) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        // Using the 'style' prop provides the highest priority to make the container invisible
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          overflow: 'visible', // Prevents any box-shadow from being clipped
        },
      }}
    >
      {/* This container is now the parent for both the form and the close button */}
      <div className="login-container">
        <IconButton
          onClick={onClose}
          className="login-modal-close-btn"
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    </Dialog>
  );
};

export default LoginModal;