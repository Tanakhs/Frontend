import React, { useEffect, useState } from "react";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../../../apiRequests/apiRequests";
import Comment from "./comment";
export default function newCommentSection(props) {
  const [comments, setComments] = useState(
    JSON.stringify(props.comments) === undefined ? [] : props.comments
  );
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingComment, setEditingComment] = useState("");
  const [newComment, setNewComment] = useState("");

  const addCommentHandle = async (comment) => {
    if (comment.trim() === "") {
      return;
    }
    await addComment(props.chapterId, comment)
      .then((result) =>
        setComments([...comments, { content: comment, id: result["_id"] }])
      )
      .catch((error) => console.log("error", error));
    setNewComment("");
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const deleteCommentHandle = async (index) => {
    await deleteComment(props.chapterId, comments[index]["id"]).catch((error) =>
      console.log("error", error)
    );
    setComments(comments.filter((_, i) => i !== index));
  };

  const editComment = (index) => {
    setEditingIndex(index);
    setEditingComment(comments[index].content);
  };

  const updateCommentHandle = async (index, newComment) => {
    const updatedComments = [...comments];
    updatedComments[index].content = newComment;
    setComments(updatedComments);
    setEditingIndex(-1);
    setEditingComment("");
    await updateComment(
      props.chapterId,
      comments[index]["id"],
      comments[index].content
    ).catch((error) => console.log("error", error));
  };

  return (
    <div>
      <h4>תגובות נוספות</h4>
      <form
        id="comment-form"
        onSubmit={(e) => {
          e.preventDefault();
          addCommentHandle(e.target.elements.comment.value);
          e.target.elements.comment.value = "";
        }}
      >
        <textarea
          id="comment"
          placeholder="נא להזין את תוכן התגובה"
          onChange={handleChange}
          value={newComment}
        ></textarea>
        <br></br>
        <button
          disabled={newComment === ""}
          type="submit"
          id="add-comment-btn"
          className="comments-section-button"
        >
          הוסף
        </button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            index={index}
            comment={comment}
            editingComment={editingComment}
            editingIndex={editingIndex}
            updateCommentHandle={updateCommentHandle}
            setEditingComment={setEditingComment}
            editComment={editComment}
            deleteCommentHandle={deleteCommentHandle}
          />
        ))}
      </div>
    </div>
  );
}
