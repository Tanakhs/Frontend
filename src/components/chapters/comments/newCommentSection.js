import React, { useState } from "react";
import { addComment } from "../../../apiRequests/apiRequests";
import Comment from "./comment";
import { useSelector } from "react-redux";

export default function NewCommentSection(props) {
  const [comments, setComments] = useState(
    props.comments && props.comments.length > 0 ? props.comments : []
  );
  const [newComment, setNewComment] = useState("");
  const user = useSelector((state) => state.user);

  const updateCommentHandle = async (index, newComment) => {
    const updatedComments = [...comments];
    updatedComments[index].content = newComment;
    setComments(updatedComments);
  };

  const deleteCommentHandle = async (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };
  const addCommentHandle = async (comment) => {
    if (comment.trim() === "") {
      return;
    }
    try {
      const result = await addComment(props.chapterId, comment);
      const newCommentObject = {
        content: comment,
        id: result["_id"],
        name: user.name,
        email: user.email,
      };
      setComments([...comments, newCommentObject]);
    } catch (error) {
      console.log("error", error);
    }
    setNewComment("");
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  return (
    <>
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
        <br />
        <button
          disabled={newComment === ""}
          type="submit"
          id="add-comment-btn"
          className="comments-section-button"
        >
          הוסף
        </button>
      </form>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          chapterId={props.chapterId}
          comment={comment}
          onUpdateComment={(newComment) =>
            updateCommentHandle(index, newComment)
          }
          onDeleteComment={() => deleteCommentHandle(index)}
        />
      ))}
    </>
  );
}
