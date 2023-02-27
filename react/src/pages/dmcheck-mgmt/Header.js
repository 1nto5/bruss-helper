import React from 'react'
import logo from '../../assets/logo.png'

const Header = (props) => {
  
  const handleClickDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Czy na pewno chcesz usunąć zaznaczone DMC?")) {
      props.clickDelete();
    }
  }
  
  const handleClickPrint = (e) => {
    e.preventDefault();
    if (window.confirm("Czy na pewno chcesz wydrukować zaznaczone DMC?")) {
      props.clickPrint();
    }
  }

  // const handleClickExcel = (e) => {
  //   e.preventDefault();
  //   props.clickExcel();
  // }
  
  
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header--logo" />
      <h1 className="header--title">DMCheck MGMT</h1>
      <nav className="header--nav">
        <a href="/#" onClick={handleClickPrint} className="header--link">Drukuj</a>
        {/* <a href="/#" onClick={handleClickExcel} className="header--link">Excel</a> */}
        <a href="/#" onClick={handleClickDelete} className="header--link">Usuń</a>
      </nav>
    </header>
  );
};

export default Header;
