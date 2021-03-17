import React from "react";
import "./Data.css";

function Data({ title, stat1, stat2, image }) {
  return (
    <div className="data">
      <h3 className="data__title">{title}</h3>
      <div className="data__bottom">
        <img src={image} alt="" />
        <div>
          <h4 className="data__stat">{stat1}</h4>
          <h4 className="data__stat">{stat2}</h4>
        </div>
      </div>
    </div>
  );
}

export default Data;
