import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ChapterPost from "./components/chapters/chapter/chapterPost";
import HomePage from "./components/homePage";
import MainNavbar from "./components/mainNavbar";
import Container from "@mui/material/Container";

function App() {
  return (
    <div>
      <Container maxWidth="lg" className=".main-div">
        <MainNavbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chapter/:_id" element={<ChapterPost />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
