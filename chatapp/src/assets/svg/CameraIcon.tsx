import React from "react";
import { IconProps } from "../../types/icons";

const CameraIcon = ({ color, className, onClick }: IconProps) => {
  return (
    <svg
      enable-background="new 0 0 50 50"
      height="50px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 50 50"
      width="50px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <rect fill="none" height="50" width="50" />
      <polygon
        fill={color}
        points="49,14 36,21 36,29   49,36 "
        stroke={color}
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
      <path
        d="M36,36c0,2.209-1.791,4-4,4  H5c-2.209,0-4-1.791-4-4V14c0-2.209,1.791-4,4-4h27c2.209,0,4,1.791,4,4V36z"
        fill={color}
        stroke={color}
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
    </svg>
  );
};

export default CameraIcon;
