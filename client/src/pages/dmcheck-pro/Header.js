import React from "react";
import logo from "../../assets/logo.png";
import {
  HeaderLinkButton,
  HeaderLinkButtonRed,
} from "../../components/Buttons";

const Header = (props) => {
  const handleClickUserLogout = (e) => {
    e.preventDefault();
    props.userLogout();
  };

  const handleClickArticleLogout = (e) => {
    e.preventDefault();
    props.articleLogout();
  };

  const handleClickWorkplaceLogout = (e) => {
    e.preventDefault();
    props.workplaceLogout();
  };

  const handleClickBoxEnd = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Czy na pewno chcesz zakończyć aktualny BOX? System poprosi o skan etykiety HYDRA."
      )
    ) {
      props.endBox();
    }
  };

  return (
    <nav className="flex flex-wrap items-center justify-between bg-gray-800 p-2 shadow-xl">
      <div className="shad mr-6 flex flex-shrink-0 items-center text-gray-50">
        <img className="ml-4 mr-6 w-48 fill-current" src={logo} alt="logo" />
        <span className="text-2xl font-bold tracking-tight">
          DMCheck {props.workplaceName}
        </span>
      </div>
      <div>
        {props.endBox && (
          <HeaderLinkButtonRed text="zakończ box" onClick={handleClickBoxEnd} />
        )}
        <HeaderLinkButton
          text="wyloguj operatora"
          onClick={handleClickUserLogout}
        />
        <HeaderLinkButton
          text="zmień artykuł"
          onClick={handleClickArticleLogout}
        />
        {!props.workplaceLogged && (
          <HeaderLinkButton
            text="stanowisko"
            onClick={handleClickWorkplaceLogout}
          />
        )}
      </div>
    </nav>
  );
};

export default Header;
