import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ChapterPost from "./components/chapters/chapter/chapterPost";
import HomePage from "./components/homePage";
import MainNavbar from "./components/mainNavbar";
function App() {
  return (
    <div>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chapter/:_id" element={<ChapterPost />} />
      </Routes>
    </div>
  );
}

export default App;
