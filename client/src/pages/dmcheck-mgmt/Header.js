import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { HeaderLinkButton } from "../../components/Buttons";
import LoginModal from "../../components/LoginModal";

const Header = (props) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClickSkip = (e) => {
    e.preventDefault();
    if (window.confirm("Czy na pewno chcesz pominąć zaznaczone pozycje?")) {
      props.clickSkip();
    }
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between bg-gray-800 p-4">
      <div className="shad mr-6 flex flex-shrink-0 items-center text-gray-50">
        <img className="ml-4 mr-6 w-48 fill-current" src={logo} alt="logo" />
        <span className="text-2xl font-bold tracking-tight">DMCheck MGMT</span>
      </div>
      <div>
        <HeaderLinkButton text="pomiń" onClick={handleClickSkip} />
        <HeaderLinkButton text="zaloguj" onClick={toggleLoginModal} />
      </div>
      {showLoginModal && <LoginModal onClose={toggleLoginModal} />}
    </nav>
  );
};

export default Header;
