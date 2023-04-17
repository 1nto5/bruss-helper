import React from "react";

function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-gray-800"></div>
    </div>
  );
}

export default LoadingAnimation;
