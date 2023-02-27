import React from 'react'
import logo from '../../assets/logo.png'

const Header = (props) => {
  
  const handleClickUserLogout = (e) => {
    e.preventDefault();
    props.userLogout();
  }

  const handleClickArticleLogout = (e) => {
    e.preventDefault();
    props.articleLogout();
  }

  const handleClickWorkplaceLogout = (e) => {
    e.preventDefault();
    props.workplaceLogout();
  }
  
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header--logo" />
      <h1 className="header--title">DMCheck {props.workplaceName}</h1>
      <nav className="header--nav">
        <a href="/#" onClick={handleClickUserLogout} className="header--link">Operator</a>
        <a href="/#" onClick={handleClickArticleLogout} className="header--link">Artykuł</a>
        {!props.workplaceLogged && <a href="/#" onClick={handleClickWorkplaceLogout} className="header--link">Stanowisko</a>}
      </nav>
    </header>
  );
};

export default Header;
