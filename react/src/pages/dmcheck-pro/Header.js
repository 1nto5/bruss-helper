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

  const handleClickBoxEnd = (e) => {
    e.preventDefault();
    if (window.confirm("Czy na pewno chcesz zakończyć aktualny BOX? System poprosi o skan etykiety HYDRA.")) {
      props.endBox();
    }
  }
  
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header--logo" />
      <h1 className="header--title">DMCheck {props.workplaceName}</h1>
      <nav className="header--nav">
        {props.endBox && (
          <a href="/#" onClick={handleClickBoxEnd} className="header--link">Zakończ box</a>
        )}
        <a href="/#" onClick={handleClickUserLogout} className="header--link">Operator</a>
        <a href="/#" onClick={handleClickArticleLogout} className="header--link">Artykuł</a>
        {!props.workplaceLogged && <a href="/#" onClick={handleClickWorkplaceLogout} className="header--link">Stanowisko</a>}
      </nav>
    </header>
  );
};

export default Header;
