import React from "react";
import "./Data.css";

function Data({ title, stat1, stat2 }) {
  return (
    <div className="data">
      <h3 className="data__title">{title}</h3>
      <h4 className="data__stat">{stat1}</h4>
      <h4 className="data__stat">{stat2}</h4>
    </div>
  );
}

export default Data;
