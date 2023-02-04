import "./App.css";
import React from "react";
import ChapterCardGrid from "./components/chapters/chapterCardGrid";
import MainNavbar from "./components/mainNavbar";
function App() {
  return (
    <div>
      <MainNavbar />
      <div className="main-div">
        <ChapterCardGrid />
      </div>
    </div>
  );
}

export default App;
