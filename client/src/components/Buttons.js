import React from "react";

export const HeaderLinkButton = (props) => {
  return (
    <a
      href="/#"
      className="mr-8 inline-block w-60 rounded border border-black bg-gray-200 px-8 py-4 text-center text-xl font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
      onClick={props.onClick}
    >
      {props.text}
    </a>
  );
};

export const HeaderLinkButtonRed = (props) => {
  return (
    <a
      href="/#"
      className="mr-16 inline-block w-60 rounded bg-red-500 px-8 py-4 text-center text-xl font-semibold text-gray-50 transition-colors duration-300 hover:bg-red-600 hover:text-white"
      onClick={props.onClick}
    >
      {props.text}
    </a>
  );
};
