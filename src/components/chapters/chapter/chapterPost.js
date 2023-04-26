import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import ReactPlaceholder from "react-placeholder/lib";
import ChapterPostHeader from "./chapterPostHeader";
// import ChapterPostVerses from "./chapterPostVerses";
import ChapterPostComments from "./chapterPostComments";
import { getChapter } from "../../../apiRequests/apiRequests";
export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};
function ChapterPost() {
  let { _id } = useParams();
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [chapterData, setChapterData] = useState([]);

  useEffect(() => {
    async function delayFunc() {
      try {
        var chapter = await getChapter(String(_id));
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
      {/* <ChapterPostVerses verses={chapterData.verses}></ChapterPostVerses> */}
      <p>{chapterData.analysis}</p>
      <ChapterPostComments
        chapterId={chapterData["id"]}
        comments={chapterData.comments}
      ></ChapterPostComments>
    </ReactPlaceholder>
  );
}
export default ChapterPost;
