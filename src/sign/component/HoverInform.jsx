import React, { useState } from "react";
import { PointInterrogation } from "../icon/PointInterrogation";
import "./HoverInform.css";
export default function HoverInform({ text, width }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="containerHover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <PointInterrogation width="1.3em" height="1.3em" />
      <div
        className="partTextHover"
        style={{ visibility: isHovered ? "visible" : "hidden" }}
      >
        <p
          style={{
            padding: "3px",
            width: width,
            backgroundColor: "rgba(0, 0, 0, 0.171)",
            borderRadius: "3px",
            fontSize: "12px",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
