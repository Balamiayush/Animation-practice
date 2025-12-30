import * as React from "react";

const Circlesvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="500"
    height="500"
    fill="none"
    {...props}
    viewBox="0 0 500 500"
    
  >
    <path
      stroke="#fff"
      strokeWidth="2"
      d="M250 1c137.519 0 249 111.481 249 249S387.519 499 250 499 1 387.519 1 250 112.481 1 250 1Z"
    ></path>
  </svg>
);

export default React.memo(Circlesvg);
