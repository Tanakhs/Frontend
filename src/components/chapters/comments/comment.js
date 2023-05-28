import React, { useState } from "react";
import UserAvatar from "../../auth/userAvatar";
import { IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
import Popover from "@mui/material/Popover";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Textarea from "@mui/joy/Textarea";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Unstable_Grid2";

export default function Comment({
  index,
  comment,
  editingComment,
  setEditingComment,
  editingIndex,
  setEditingIndex,
  updateCommentHandle,
  editComment,
  deleteCommentHandle,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "ינואר",
      "פברואר",
      "מרץ",
      "אפריל",
      "מאי",
      "יוני",
      "יולי",
      "אוגוסט",
      "ספטמבר",
      "אוקטובר",
      "נובמבר",
      "דצמבר",
    ];
    const year = date.getFullYear();
    if (!year) return "עכשיו";
    const month = monthNames[date.getMonth()];
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDate = ` ${day} ${month} , ${year}`;
    return formattedDate;
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Grid container style={{ marginTop: "0.5rem" }}>
      <Grid xs={0.5} style={{ marginTop: "0.5rem" }}>
        <UserAvatar userName={comment.name} />
      </Grid>
      <Grid xs={11.5}>
        <Paper elevation={3}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingRight: "1rem",
            }}
          >
            <div>{comment.name}</div>
            <div>&nbsp;•&nbsp;</div>
            <div style={{ fontSize: "0.7em", color: "gray" }}>
              {formatDate(comment.date_added)}
            </div>
            <IconButton
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              <MoreHorizIcon></MoreHorizIcon>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <IconButton
                size="small"
                onClick={() => {
                  editComment(index);
                  handleClose();
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  deleteCommentHandle(index);
                  handleClose();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Popover>
          </div>
          {editingIndex === index ? (
            <form
              style={{ display: "flex" }}
              onSubmit={(e) => {
                e.preventDefault();
                updateCommentHandle(index, e.target.elements.comment.value);
              }}
            >
              <Textarea
                style={{ width: "100%" }}
                name="comment"
                value={editingComment}
                onChange={(e) => setEditingComment(e.target.value)}
              ></Textarea>
              <Tooltip title="Save">
                <IconButton type="submit" size="small">
                  <SaveAltIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton size="small" onClick={() => setEditingIndex(-1)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </form>
          ) : (
            <>
              <div
                style={{
                  overflowWrap: "break-word",
                  padding: "0.5rem",
                }}
              >
                {comment.content}
              </div>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
