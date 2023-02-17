import React, { useEffect, useState } from "react";
import "../../../css/ChapterPostComments.css";

export default function ChapterPostComments(props) {
  const [comments, setComments] = useState(
    JSON.stringify(props.comments) === undefined ? [] : props.comments
  );
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingComment, setEditingComment] = useState("");

  useEffect(() => {
    const addCommentBtn = document.getElementById("add-comment-btn");
    const commentTextarea = document.getElementById("comment-text");

    commentTextarea.addEventListener("input", () => {
      if (commentTextarea.value.trim() === "") {
        addCommentBtn.disabled = true;
        return;
      } else {
        addCommentBtn.disabled = false;
      }
    });
  });
  const addComment = async (comment) => {
    if (comment.trim() === "") {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NjQ4Nzg0NSwianRpIjoiNjFlYWFkNTQtODMyNS00MWFkLThjYTktNTY4MTZmMmMxNTk4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE2NzY0ODc4NDUsImV4cCI6MTY3NjU3NDI0NX0.p1lRmp1QgN0hsWHfqMnRjEKLcsndJZsXEiRSLA7uTMM"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      content: comment,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const res = await fetch(
      `http://127.0.0.1:5000/api/v1/comment/${props.chapterId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        setComments([...comments, { content: comment, _id: result["_id"] }])
      )
      .catch((error) => console.log("error", error));
  };

  const deleteComment = async (index) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NjQ4Nzg0NSwianRpIjoiNjFlYWFkNTQtODMyNS00MWFkLThjYTktNTY4MTZmMmMxNTk4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE2NzY0ODc4NDUsImV4cCI6MTY3NjU3NDI0NX0.p1lRmp1QgN0hsWHfqMnRjEKLcsndJZsXEiRSLA7uTMM"
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `http://127.0.0.1:5000/api/v1/comment/${props.chapterId}/${comments[index]["_id"]}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setComments(comments.filter((_, i) => i !== index));
  };

  const editComment = (index) => {
    setEditingIndex(index);
    setEditingComment(comments[index].content);
  };

  const updateComment = (index, newComment) => {
    const updatedComments = [...comments];
    updatedComments[index].content = newComment;
    setComments(updatedComments);
    setEditingIndex(-1);
    setEditingComment("");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NjQ4Nzg0NSwianRpIjoiNjFlYWFkNTQtODMyNS00MWFkLThjYTktNTY4MTZmMmMxNTk4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE2NzY0ODc4NDUsImV4cCI6MTY3NjU3NDI0NX0.p1lRmp1QgN0hsWHfqMnRjEKLcsndJZsXEiRSLA7uTMM"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      content: comments[index].content,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://127.0.0.1:5000/api/v1/comment/${props.chapterId}/${comments[index]["_id"]}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="comments-section">
      <h2 className="comments-section-header">Comment Section</h2>
      <form
        id="comment-form"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(e.target.elements.comment.value);
          e.target.elements.comment.value = "";
        }}
      >
        <textarea
          id="comment-text"
          placeholder="Enter your comment here"
          className="comments-section-textarea"
        ></textarea>
        <br></br>
        <button
          disabled="true"
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
                  updateComment(index, e.target.elements.comment.value);
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
                  onClick={() => deleteComment(index)}
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
