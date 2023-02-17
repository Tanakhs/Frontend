import ChapterCard from "./chapterCard";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder/lib";
import { getChapters } from "../../apiRequests/apiRequests";

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
      <Row xs={1} md={3} className="g-4">
        {chaptersData.map(function(post) {
          return (
            <Col key={post._id}>
              <ChapterCard
                _id={post._id}
                title={post.title}
                book={post.book}
                chapter={post.chapter_letters}
                moralRating={String(post.rating.moral)}
                scientificRating={String(post.rating.scientific)}
              />
            </Col>
          );
        })}
      </Row>
    </ReactPlaceholder>
  );
}

export default ChapterCardGrid;
