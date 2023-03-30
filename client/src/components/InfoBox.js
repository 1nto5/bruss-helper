import React from "react";

const InfoBox = ({ children }) => {
  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="max-w-4xl rounded bg-gray-50 p-8 text-center text-gray-800 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default InfoBox;
