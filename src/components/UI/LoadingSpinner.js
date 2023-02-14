import React from "react";

const LoadingSpinner = ({ style }) => {
  return (
    <div className="h-auto w-min absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <i
        className="fas fa-circle-notch text-4xl loading-spinner"
        // Style will receive a style as a prop. This is mainly for changing the text color in different
        // components and helps with better contrast.
        style={style}
      ></i>
    </div>
  );
};

export default LoadingSpinner;
