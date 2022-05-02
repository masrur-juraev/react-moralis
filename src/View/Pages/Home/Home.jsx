import React from "react";

import Hero from "./Components/Hero/Hero";
import Howitwork from "./Components/Howitwork/Howitwork";
// import Game from "./Components/Game/Game";
import Leaderboard from "./Components/LeaderBoard/Leaderboard";
import Tournament from "./Components/Tournament/Tournament";
import Articles from "./Components/Articles/Articles";
// import Navigation from "../../Components/Navigation/Navigation";
export default function Home() {
  return (
    <>
      <Hero />
      <Howitwork />
      {/* <Game /> */}
      <Leaderboard />
      <Tournament />
      <Articles />
    </>
  );
}
