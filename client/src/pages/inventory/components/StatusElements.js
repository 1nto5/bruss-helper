import React from "react";

export const StatusBox = (props) => {
  return (
    <div className="ml-auto mr-auto box-border text-center">
      <p className="text-l font-thin tracking-widest text-gray-700">
        {props.text}
      </p>
      <p className="text-xl text-gray-900">{props.value}</p>
    </div>
  );
};

export const BoxSeparator = () => {
  return <div className="h-10 border-l-2 border-gray-200"></div>;
};
