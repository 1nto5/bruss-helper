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
    <header className='bg-black h-24 text-white flex items-center justify-between  px-5 py-3'>
      <div className='flex items-center'>
        <img src={logo} alt="logo" className='h-8 mr-2' />
        <h1 className='text-lg font-bold'>DMCheck {props.workplaceName}</h1>
      </div>

      
        {props.endBox && (
          <a href="/#" onClick={handleClickBoxEnd} className=''>Zakończ box</a>
        )}
        <a href="/#" onClick={handleClickUserLogout} className=''>Operator</a>
        <a href="/#" onClick={handleClickArticleLogout} className=''>Artykuł</a>
        {!props.workplaceLogged && <a href="/#" onClick={handleClickWorkplaceLogout} className=''>Stanowisko</a>}


      
    </header>
  );
};

export default Header;
