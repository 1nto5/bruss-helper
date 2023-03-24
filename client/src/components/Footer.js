import React from "react";

const Footer = (props) => {
  return (
    <footer className="fixed bottom-2 right-7 p-5 font-extralight">
      {props.version}
    </footer>
  );
};

export default Footer;
