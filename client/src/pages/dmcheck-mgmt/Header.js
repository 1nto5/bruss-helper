import React from 'react'
import logo from '../../assets/logo.png'

const Header = (props) => {
  
  const handleClickSkip = (e) => {
    e.preventDefault();
    if (window.confirm("Czy na pewno chcesz pominąć zaznaczone pozycje?")) {
      props.clickSkip();
    }
  }
  
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header--logo" />
      <h1 className="header--title">DMCheck MGMT</h1>
      <nav className="header--nav">
        <a href="/#" onClick={handleClickSkip} className="header--link">Pomiń</a>
      </nav>
    </header>
  );
};

export default Header;
