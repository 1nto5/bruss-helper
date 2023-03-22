import React from "react";

export const HeaderLinkButton = (props) => {
  return (
    <a
      href="/#"
      className="mr-6 inline-block w-48 rounded bg-gray-300 px-8 py-2 text-center text-2xl text-gray-800 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-800"
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
      className="mr-6 inline-block w-48 rounded bg-gray-300 px-8 py-2 text-center text-2xl text-gray-800 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-800"
      onClick={props.onClick}
    >
      {props.text}
    </a>
  );
};
