import React, { useState, useContext } from 'react'
import logo from '../../../assets/logo.png'
import { HeaderLinkButton } from '../../../components/Buttons'
import Modal from './Modal'
import { Context } from '../Context'

const Header = (props) => {
  const [showCardChooserModal, setShowCardChooserModal] = useState(false)
  const { cardNumber, closeCard } = useContext(Context)

  const handleEndCard = () => {
    if (
      window.confirm(
        `Czy na pewno chcesz zakończyć pracę z kartą numer: ${cardNumber}?`
      )
    ) {
      closeCard.mutate()
    }
  }

  const toggleModal = () => {
    setShowCardChooserModal(!showCardChooserModal)
  }

  return (
    <nav className="flex flex-wrap items-center justify-between bg-gray-800 p-4 shadow-lg">
      <div className="shad mr-6 flex flex-shrink-0 items-center text-gray-50">
        <img className="ml-4 mr-6 w-48 fill-current" src={logo} alt="logo" />
        <span className="text-2xl font-bold tracking-tight">Inventory</span>
      </div>
      <div>
        {cardNumber ? (
          <>
            <HeaderLinkButton text="zamknij kartę" onClick={handleEndCard} />
          </>
        ) : (
          <HeaderLinkButton text="wybierz kartę" onClick={toggleModal} />
        )}
      </div>
      {showCardChooserModal && <Modal onClose={toggleModal} />}
    </nav>
  )
}

export default Header
