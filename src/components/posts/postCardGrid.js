import PostCard from "./postCard";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder/lib";
import { data } from "../../data";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function PostCardGrid() {
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [postData, setPostData] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(2000);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setPostData(data);
      } catch (error) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
      }
    }
    delayFunc();
  });
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
              <PostCard
                title={post.title}
                book={post.book}
                chapter={post.chapter}
                moralRating={post.rating.moral}
                scientificRating={post.rating.scientific}
              />
            </Col>
          );
        })}
      </Row>
    </ReactPlaceholder>
  );
}

export default PostCardGrid;
