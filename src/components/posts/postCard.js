import React from "react";
import PostRatings from "./postRatings";
import Card from "react-bootstrap/Card";

function PostCard(props) {
  return (
    <div style={{ width: "22rem" }}>
      <Card
        style={{ width: "22rem" }}
        text={"light"}
        onClick={() => console.log("hello")}
      >
        <Card.Img
          src={
            "https://meyda.education.gov.il/files/pop/2418/%D7%91%D7%A8%D7%99%D7%90%D7%AA%D7%A2%D7%95%D7%9C%D7%9D%D7%97%D7%98%D7%A2.jpg"
          }
          alt="Card image"
        />
        <Card.ImgOverlay>
          <Card.Title bsPrefix className="post-title">
            {props.title}
          </Card.Title>
          <Card.Text className="post-text">
            {props.book} {props.chapter}
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
      <PostRatings value={props.moralRating} title="מוסר" />
      <PostRatings value={props.scientificRating} title="מדע" />
    </div>
  );
}

export default PostCard;
