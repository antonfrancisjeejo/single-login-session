import React from "react";
import Header from "../components/Header";
import { Player } from "video-react";
import "../../node_modules/video-react/dist/video-react.css";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <h1>Home</h1>
      <div className="app">
        <div
          className="app-video"
          onContextMenu={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          <Player
            playsInline
            src="https://origintestbucket.s3.ap-south-1.amazonaws.com/Mersal+-+Mersal+Arasan+Tamil+Video+++Vijay+++A.R.+Rahman(720p).MP4"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
