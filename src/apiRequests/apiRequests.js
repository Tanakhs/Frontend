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
export async function addComment(chapterId, comment) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NjY0ODU4OSwianRpIjoiMTFiMzk2YmUtMDc5Mi00OTI2LWIxZjItYmFiMjVhMWViZTVlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE2NzY2NDg1ODksImV4cCI6MTY3NjczNDk4OX0.5qURSm7lQSVlo5dNtdRS1kLRVBULA5rZ_lSn2owOAvQ"
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

  const response = await fetch(
    `http://127.0.0.1:5000/api/v1/comment/${chapterId}`,
    requestOptions
  );
  return await response.json();
}

export async function deleteComment(chapterId, commentId) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NjY0ODU4OSwianRpIjoiMTFiMzk2YmUtMDc5Mi00OTI2LWIxZjItYmFiMjVhMWViZTVlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE2NzY2NDg1ODksImV4cCI6MTY3NjczNDk4OX0.5qURSm7lQSVlo5dNtdRS1kLRVBULA5rZ_lSn2owOAvQ"
  );
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

export async function updateComment(chapterId, commentId, newContent) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NjY0ODU4OSwianRpIjoiMTFiMzk2YmUtMDc5Mi00OTI2LWIxZjItYmFiMjVhMWViZTVlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE2NzY2NDg1ODksImV4cCI6MTY3NjczNDk4OX0.5qURSm7lQSVlo5dNtdRS1kLRVBULA5rZ_lSn2owOAvQ"
  );
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
