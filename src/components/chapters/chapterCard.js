import React from "react";
import ChapterRatings from "./chapterRatings";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function ChapterCard(props) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://meyda.education.gov.il/files/pop/2418/%D7%91%D7%A8%D7%99%D7%90%D7%AA%D7%A2%D7%95%D7%9C%D7%9D%D7%97%D7%98%D7%A2.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          ואהבת לרעך כמוך
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          className="post-text"
          gutterBottom
        >
          {props.book}: {props.chapter}'
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית הועניב היושבב שערש
          שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף.
        </Typography>
        <ChapterRatings value={props.moralRating} title="מוסר" />
        <ChapterRatings value={props.scientificRating} title="מדע" />
      </CardContent>
      <CardActions>
        <Typography>
          <Button size="small">שתפו</Button>
          <Button
            size="small"
            onClick={() => navigate(`/chapter/${String(props._id)}`)}
          >
            קראו עוד
          </Button>
        </Typography>
      </CardActions>
    </Card>
  );
}
