import React from "react";

import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
