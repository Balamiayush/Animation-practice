import React from "react";

const LayoutWrapper = ({ children }) => {
  return (
    <div className="max-w-[1400px] mx-auto  w-full px-4">
      {children}
    </div>
  );
};

export default LayoutWrapper;
