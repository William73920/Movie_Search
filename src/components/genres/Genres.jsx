import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data?.map((g) => {
        return (
          <div key={g} className="genre">
            {genres[g]?.item?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
