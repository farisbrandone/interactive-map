import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const MyImg = ({ url }) => (
  <Zoom>
    <img alt="" src={url} className="imageCarte" />
  </Zoom>
);
