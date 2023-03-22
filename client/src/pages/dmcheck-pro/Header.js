import React from 'react'
import logo from '../../assets/logo.png'
import { navButton, navButtonRed } from '../../assets/tailwind';

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
    <nav className='flex items-center justify-between flex-wrap bg-gray-200 shadow-2xl text-white p-6'>
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <img className="fill-current w-48 mr-2" src={logo} alt="logo" />
        <span className="font-semibold text-2xl tracking-tight">DMCheck {props.workplaceName}</span>
      </div>
      <div>
        {props.endBox && (
          <a href="/#" className={navButtonRed} onClick={handleClickBoxEnd}>zakończ box</a>
        )}
        <a href="/#" className={navButton} onClick={handleClickUserLogout}>wyloguj operatora</a>
        <a href="/#" className={navButton} onClick={handleClickArticleLogout}>zmień artykuł</a>
        {!props.workplaceLogged && 
          <a href="/#" className={navButton} onClick={handleClickWorkplaceLogout}>zmień stanowisko</a>
        }
      </div>
    </nav>
  );
};

export default Header;
