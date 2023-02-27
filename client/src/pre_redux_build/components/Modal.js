import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useTheme } from "@mui/system";
import { Typography, Box} from "@mui/material";
import Comment from "./Comment";
import { useEffect, useState } from "react";

export default function Modal({
  children,
  open,
  handleClose,
  handleSave,
  saveText,
  len,
  comments,
  loggedUser
}) {
  const theme = useTheme();
  const handleClick = () => {
    handleSave();
    handleClose();
  };


  



  return (
      <Box>
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box textAlign="right" borderBottom="1px solid #ccc">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          disabled={len === 0}
          variant="contained"
          color="success"
          size="small"
          sx={{
            borderRadius: theme.shape.borderRadius,
            fontSize: "12px",
          }}
          onClick={handleClick}
        >
          {saveText}
        </Button>
      </DialogActions>
      {comments?.map((comment) =>( 
                    <Comment key={comment.id} comment={comment} loggedUser={loggedUser}/>
                ))}
    </Dialog>
     </Box>
  );
}