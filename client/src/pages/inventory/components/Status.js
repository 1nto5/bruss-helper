import React, { useContext } from 'react'
import { StatusBox, BoxSeparator } from './StatusElements'
import { Context } from '../Context'
import InfoBox from '../../../components/InfoBox'
import LoadingAnimation from './LoadingAnimation'

function Status() {
  const {
    cardNumber,
    warehouse,
    inventoryTaker1,
    inventoryTaker2,
    reserveCard,
  } = useContext(Context)

  return (
    <>
      {!reserveCard.isLoading ? (
        cardNumber && warehouse && inventoryTaker1 && inventoryTaker2 ? (
          <div className="mb-4 flex h-20 flex-row items-center justify-between bg-gray-50 shadow-lg">
            <StatusBox text="karta:" value={cardNumber} />
            <BoxSeparator />
            <StatusBox text="pozycja:" value={cardNumber} />
            <BoxSeparator />
            <StatusBox text="magazyn:" value={warehouse} />
            <BoxSeparator />
            <StatusBox
              text="inwentaryzują:"
              value={`${inventoryTaker1} i ${inventoryTaker2}`}
            />
          </div>
        ) : (
          <InfoBox>
            <p>
              Aby rozpocząć proces inwentaryzacji kliknij "wybierz kartę"
              powyżej i postępuj zgodnie z instrukcjami.
            </p>
          </InfoBox>
        )
      ) : (
        <LoadingAnimation />
      )}
    </>
  )
}

export default Status
