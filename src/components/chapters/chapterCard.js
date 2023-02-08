import React from "react";
import ChapterRatings from "./chapterRatings";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function ChapterCard(props) {
  const navigate = useNavigate();

  return (
    <div style={{ marginLeft: "2rem", marginRight: "2rem", marginTop: "2rem" }}>
      <Card
        text={"light"}
        onClick={() => navigate(`/chapter/${String(props._id)}`)}
      >
        <Card.Img
          style={{ borderRadius: "0" }}
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
            {props.book}: {props.chapter}'
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
      <ChapterRatings value={props.moralRating} title="מוסר" />
      <ChapterRatings value={props.scientificRating} title="מדע" />
    </div>
  );
}
