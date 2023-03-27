import React from "react";
import logo from "../../assets/logo.png";
import { HeaderLinkButton } from "../../components/Buttons";

const Header = (props) => {
  const handleClickSkip = (e) => {
    e.preventDefault();
    if (window.confirm("Czy na pewno chcesz pominąć zaznaczone pozycje?")) {
      props.clickSkip();
    }
  };

  return (
    // <header className="header">
    //   <img src={logo} alt="logo" className="header--logo" />
    //   <h1 className="header--title">DMCheck MGMT</h1>
    //   <nav className="header--nav">
    //     <a href="/#" onClick={handleClickSkip} className="header--link">Pomiń</a>
    //   </nav>
    // </header>
    <nav className="flex flex-wrap items-center justify-between bg-gray-800 p-4">
      <div className="shad mr-6 flex flex-shrink-0 items-center text-gray-50">
        <img className="ml-4 mr-6 w-48 fill-current" src={logo} alt="logo" />
        <span className="text-2xl font-bold tracking-tight">DMCheck MGMT</span>
      </div>
      <div>
        <HeaderLinkButton text="pomiń" onClick={handleClickSkip} />
      </div>
    </nav>
  );
};

export default Header;
