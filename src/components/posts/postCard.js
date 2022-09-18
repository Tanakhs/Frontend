import React from "react";
import PostRatings from "./postRatings";
import Card from "react-bootstrap/Card";

function PostCard(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img src={require("../../logo.svg")} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.book} {props.chapter}
        </Card.Text>
      </Card.ImgOverlay>
      <Card.Footer>
        <PostRatings value={props.moralRating} title="מוסר" />
        <PostRatings value={props.scientificRating} title="מדע" />
      </Card.Footer>
    </Card>
  );
}

export default PostCard;
