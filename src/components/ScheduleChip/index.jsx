import React from "react";
import "./style.sass";

const SchduleChip = ({text}) => {
  return (
    <div className="chip">
      <span className="chip__label">{text}</span>
    </div>
  );
}

export default SchduleChip;