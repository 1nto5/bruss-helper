import React, { useContext } from "react";
import { StatusBox, BoxSeparator } from "./StatusElements";
import { Context } from "../Context";
import InfoBox from "../../../components/InfoBox";
import LoadingAnimation from "./LoadingAnimation";

function Status() {
  const { cardNumber, warehouse, inventoryTakers, reserveCardMutation } =
    useContext(Context);

  return (
    <>
      {!reserveCardMutation.isLoading ? (
        cardNumber && warehouse && inventoryTakers ? (
          <div className="mb-4 flex h-20 flex-row items-center justify-between bg-gray-50 shadow-lg">
            <StatusBox text="karta:" value={cardNumber} />
            <BoxSeparator />
            <StatusBox text="magazyn:" value={warehouse} />
            <BoxSeparator />
            <StatusBox text="inwentaryzują:" value={inventoryTakers} />
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
  );
}

export default Status;
