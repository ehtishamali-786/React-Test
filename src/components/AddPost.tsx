import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { savePost, fetchAllPosts } from "../redux/postsSlice";
import { AppDispatch } from "../redux/store";
export default function AddPostDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const id = Math.floor(Math.random() * 10000);
    if (!title.trim() || !content.trim() ) {
      return;
    }

    await dispatch(savePost({ id, title, content, }));

    await dispatch(fetchAllPosts());
    // Clear the title and content fields
    setTitle("");
    setContent("");
    // Close the dialog
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Post Data
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Post </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="content"
            label="Content"
            type="text"
            multiline
            rows={4}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
