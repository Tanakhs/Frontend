import React from "react";
import Rating from "react-star-rating-lite";
import "../../css/post.css";

function PostRatings(props) {
  return (
    <div className="rating-div">
      <div className="rating">
        <Rating {...props} weight="15px" readonly color="grey" />
      </div>
      {props.title}
    </div>
  );
}

export default PostRatings;
