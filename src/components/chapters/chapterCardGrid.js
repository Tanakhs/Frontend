import ChapterCard from "./chapterCard";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder/lib";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function ChapterCardGrid() {
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [postData, setPostData] = useState([]);

  let response;
  let chapters;
  useEffect(() => {
    async function delayFunc() {
      try {
        response = await fetch("http://127.0.0.1:5000/api/v1/chapters", {
          method: "GET",
          headers: {},
        });
        chapters = await response.json();
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setPostData(chapters);
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
      <Row xs={1} md={3} className="g-4">
        {postData.map(function(post) {
          return (
            <Col key={post._id}>
              <ChapterCard
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
