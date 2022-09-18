import React from "react";
import Rating from "react-star-rating-lite";
import "../../css/post.css";

function PostRatings(props) {
  return (
    <div className="ratingDiv">
      <div className="rating">
        <Rating {...props} weight="15px" />
      </div>
      {props.title}
    </div>
  );
}

export default PostRatings;
