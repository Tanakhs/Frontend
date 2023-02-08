import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import ReactPlaceholder from "react-placeholder/lib";
import ChapterPostHeader from "./chapterPostHeader";
import ChapterPostVerses from "./chapterPostVerses";
import ChapterPostComments from "./chapterPostComments";
export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};
function ChapterPost() {
  let { _id } = useParams();
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [chapterData, setChapterData] = useState([]);

  let response;
  let chapter;
  useEffect(() => {
    async function delayFunc() {
      try {
        response = await fetch(
          `http://127.0.0.1:5000/api/v1/chapter/${String(_id)}`,
          {
            method: "GET",
            headers: {},
          }
        );
        chapter = await response.json();
        setChapterData(chapter);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      } catch (error) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
      }
    }
    delayFunc();
  }, []);
  return (
    <ReactPlaceholder
      type="media"
      rows={20}
      ready={requestStatus === REQUEST_STATUS.SUCCESS}
    >
      <ChapterPostHeader
        book={chapterData.book}
        chapter_letters={chapterData.chapter_letters}
      ></ChapterPostHeader>
      <ChapterPostVerses verses={chapterData.verses}></ChapterPostVerses>
      <p>{chapterData.analysis}</p>
      <ChapterPostComments
        comments={chapterData.comments}
      ></ChapterPostComments>
    </ReactPlaceholder>
  );
}
export default ChapterPost;
