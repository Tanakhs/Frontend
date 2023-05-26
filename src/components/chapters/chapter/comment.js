import React, { useState } from "react";
import UserAvatar from "../../auth/userAvatar";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
export default function Comment({
  index,
  comment,
  editingComment,
  editingIndex,
  updateCommentHandle,
  setEditingComment,
  editComment,
  deleteCommentHandle,
}) {
  if (editingIndex === index) {
    return (
      <>
        <UserAvatar userName={comment.name}></UserAvatar>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateCommentHandle(index, e.target.elements.comment.value);
          }}
        >
          <textarea
            name="comment"
            value={editingComment}
            onChange={(e) => setEditingComment(e.target.value)}
          ></textarea>
          <IconButton type="submit" size="small">
            <SaveAltIcon></SaveAltIcon>
          </IconButton>
          <IconButton
            type="submit"
            size="small"
            onClick={() => setEditingComment("")}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </form>
      </>
    );
  } else {
    return (
      <div>
        <UserAvatar
          userName={comment.name}
          onClick={() => console.log(comment.name)}
        ></UserAvatar>
        {comment.content}
        <IconButton size="small" onClick={() => editComment(index)}>
          <EditIcon></EditIcon>
        </IconButton>
        <IconButton size="small" onClick={() => deleteCommentHandle(index)}>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </div>
    );
  }
}
