import ChapterCard from "./chapterCard";
import React, { useState, useEffect } from "react";
import ReactPlaceholder from "react-placeholder/lib";
import { getChapters } from "../../apiRequests/apiRequests";
import Grid from "@mui/material/Grid";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function ChapterCardGrid() {
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [chaptersData, setChaptersData] = useState([]);

  let chapters;
  useEffect(() => {
    async function getData() {
      try {
        chapters = await getChapters();
        setChaptersData(chapters);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      } catch (error) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
      }
    }
    getData();
  }, []);
  return (
    <ReactPlaceholder
      type="media"
      rows={20}
      ready={requestStatus === REQUEST_STATUS.SUCCESS}
    >
      <Grid container spacing={3}>
        {chaptersData.map(function (post) {
          return (
            <Grid item xs={4} key={post.id}>
              <ChapterCard
                _id={post.id}
                title={post.title}
                book={post.book}
                chapter={post.chapter_letters}
                moralRating={String(post.rating.moral)}
                scientificRating={String(post.rating.scientific)}
              />
            </Grid>
          );
        })}
      </Grid>
    </ReactPlaceholder>
  );
}

export default ChapterCardGrid;
