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
    <nav className='flex items-center justify-between flex-wrap bg-gray-800 text-white p-6'>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img className="fill-current w-48 mr-2" src={logo} alt="logo" />
        <span className="font-semibold text-2xl tracking-tight">DMCheck {props.workplaceName}</span>
      </div>
      <div>
        {props.endBox && (
          <a href="/#" className='inline-block text-lg uppercase px-8 py-6 ml-auto leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white' onClick={handleClickBoxEnd}>Zakończ</a>
        )}
        <a href="/#" className='inline-block text-lg uppercase px-8 py-6 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white' onClick={handleClickUserLogout}>Operator</a>
        <a href="/#" className='inline-block text-lg uppercase px-8 py-6 ml-6 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white' onClick={handleClickArticleLogout}>artykuł</a>
        {!props.workplaceLogged && 
          <a href="/#" className='inline-block text-lg uppercase px-8 py-6 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white' onClick={handleClickWorkplaceLogout}>Stanowisko</a>
        }
      </div>
    </nav>
  );
};

export default Header;
