import React from "react";

export const StatusBox = (props) => {
  return (
    <div className="ml-auto mr-auto box-border text-center">
      <p className="text-xl font-thin tracking-widest text-gray-700">
        {props.text}
      </p>
      <p className="text-6xl text-gray-900">{props.value}</p>
    </div>
  );
};

export const StatusBoxBlinking = (props) => {
  return (
    <div className="ml-auto mr-auto box-border p-20 text-center">
      <p className="text-xl font-thin tracking-widest text-gray-700">
        {props.text}
      </p>
      <p className=" animate-pulse text-6xl text-bruss">{props.value}</p>
    </div>
  );
};

export const BoxSeparator = () => {
  return <div className="h-20 border-l-2 border-gray-200"></div>;
};
