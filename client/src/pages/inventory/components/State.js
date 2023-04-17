import React, { useState, useContext } from "react";
import InfoBox from "../../../components/InfoBox";

import { Context } from "../Context";

const Status = () => {
  const { cardNumber, warehouse, reserveCardMutation } = useContext(Context);

  return (
    <>
      {reserveCardMutation.isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-800"></div>
        </div>
      ) : cardNumber ? (
        <h2 className="mb-4 text-xl font-bold">
          Numer karty: {cardNumber} Magazyn numer: {warehouse}
        </h2>
      ) : (
        <InfoBox>
          <p>
            Aby rozpocząć proces inwentaryzacji kliknij "wybierz kartę" powyżej
            i postępuj zgodnie z instrukcjami.
          </p>
        </InfoBox>
      )}
    </>
  );
};

export default Status;
