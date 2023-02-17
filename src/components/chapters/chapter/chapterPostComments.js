import React, { useEffect, useState } from "react";
import "../../../css/ChapterPostComments.css";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../../../apiRequests/apiRequests";
export default function ChapterPostComments(props) {
  const [comments, setComments] = useState(
    JSON.stringify(props.comments) === undefined ? [] : props.comments
  );
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingComment, setEditingComment] = useState("");

  useEffect(() => {
    const addCommentBtn = document.getElementById("add-comment-btn");
    const commentTextarea = document.getElementById("comment");

    commentTextarea.addEventListener("input", () => {
      if (commentTextarea.value.trim() === "") {
        addCommentBtn.disabled = true;
        return;
      } else {
        addCommentBtn.disabled = false;
      }
    });
  });
  const addCommentHandle = async (comment) => {
    if (comment.trim() === "") {
      return;
    }
    await addComment(props.chapterId, comment)
      .then((result) =>
        setComments([...comments, { content: comment, _id: result["_id"] }])
      )
      .catch((error) => console.log("error", error));
  };

  const deleteCommentHandle = async (index) => {
    await deleteComment(
      props.chapterId,
      comments[index]["_id"]
    ).catch((error) => console.log("error", error));
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
      comments[index]["_id"],
      comments[index].content
    ).catch((error) => console.log("error", error));
  };

  return (
    <div className="comments-section">
      <h2 className="comments-section-header">Comment Section</h2>
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
          placeholder="Enter your comment here"
          className="comments-section-textarea"
        ></textarea>
        <br></br>
        <button
          disabled={true}
          type="submit"
          id="add-comment-btn"
          className="comments-section-button"
        >
          Add Comment
        </button>
      </form>
      <div className="comments-section-comments">
        {comments.map((comment, index) => {
          if (index === editingIndex) {
            return (
              <form
                key={index}
                onSubmit={(e) => {
                  e.preventDefault();
                  updateCommentHandle(index, e.target.elements.comment.value);
                }}
              >
                <textarea
                  name="comment"
                  className="comments-section-textarea"
                  value={editingComment}
                  onChange={(e) => setEditingComment(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="comments-section-button comments-section-button-update"
                >
                  Update Comment
                </button>
                <button
                  onClick={() => setEditingIndex(-1)}
                  className="comments-section-button comments-section-button-cancel"
                >
                  Cancel
                </button>
              </form>
            );
          } else {
            return (
              <div key={index} className="comments-section-comment">
                {comment.content}
                <button
                  onClick={() => editComment(index)}
                  className="comments-section-button comments-section-button-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCommentHandle(index)}
                  className="comments-section-button comments-section-button-delete"
                >
                  Delete
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
