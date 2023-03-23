import React from "react";

export const HeaderLinkButton = (props) => {
  return (
    <a
      href="/#"
      className="mr-8 inline-block w-52 rounded bg-gray-200 px-2 py-4 text-center text-xl font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
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
      className="mr-8 inline-block w-52 rounded bg-red-500 px-2 py-4 text-center text-xl font-semibold text-gray-50 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-800"
      onClick={props.onClick}
    >
      {props.text}
    </a>
  );
};
