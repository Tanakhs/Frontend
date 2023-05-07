export async function getUserInfo(codeResponse) {
  var response = await fetch("/api/v1/google_login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: codeResponse.code }),
  });
  return await response.json();
}
export async function getChapters() {
  var response = await fetch("http://localhost:5000/api/v1/chapters", {
    method: "GET",
    headers: {},
  });
  return await response.json();
}

export async function getChapter(chapterId) {
  var response = await fetch(
    `http://localhost:5000/api/v1/chapter/${chapterId}`,
    {
      method: "GET",
      headers: {},
    }
  );

  return await response.json();
}

export async function addComment(chapterId, comment) {
  const response = await fetch(
    `http://localhost:5000/api/v1/comment/${chapterId}`,
    {
      method: "POST",
      body: JSON.stringify({
        content: comment,
      }),
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}

export async function deleteComment(chapterId, commentId) {
  var response = await fetch(
    `http://localhost:5000/api/v1/comment/${chapterId}/${commentId}`,
    {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}

export async function updateComment(chapterId, commentId, newContent) {
  var response = await fetch(
    `http://localhost:5000/api/v1/comment/${chapterId}/${commentId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        content: newContent,
      }),
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}
