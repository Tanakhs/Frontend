export async function getUserInfo(codeResponse) {
  var response = await fetch("http://127.0.0.1:5000/api/v1/google_login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: codeResponse.code }),
  });
  return await response.json();
}
export async function getChapters() {
  var response = await fetch("http://127.0.0.1:5000/api/v1/chapters", {
    method: "GET",
    headers: {},
  });
  return await response.json();
}

export async function getChapter(chapterId) {
  var response = await fetch(
    `http://127.0.0.1:5000/api/v1/chapter/${chapterId}`,
    {
      method: "GET",
      headers: {},
    }
  );

  return await response.json();
}
export async function addComment(chapterId, comment, jwt) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwt}`);
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

  const response = await fetch(
    `http://127.0.0.1:5000/api/v1/comment/${chapterId}`,
    requestOptions
  );
  return await response.json();
}

export async function deleteComment(chapterId, commentId, jwt) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwt}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  var response = await fetch(
    `http://127.0.0.1:5000/api/v1/comment/${chapterId}/${commentId}`,
    requestOptions
  );
  return await response.json();
}

export async function updateComment(chapterId, commentId, newContent, jwt) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwt}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    content: newContent,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var response = await fetch(
    `http://127.0.0.1:5000/api/v1/comment/${chapterId}/${commentId}`,
    requestOptions
  );
  return await response.json();
}
