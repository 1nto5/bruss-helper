import React, { useState, useContext } from "react";

import { Context } from "../Context";

const CardTable = () => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const { cardNumber, warehouse, inventoryTakers, reserveCardMutation } =
    useContext(Context);

  const handleLabelConfirmation = () => {
    if (currentPosition < 25) {
      setCurrentPosition(currentPosition + 1);
    } else {
      alert(
        "Maksymalna ilośc na karcie osiągnięta! Zakończ kartę i wybierz kolejną."
      );
    }
  };

  return (
    <div className="">
      {cardNumber && warehouse && inventoryTakers && (
        <>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-left text-gray-50">
                <th className="p-2 font-extralight">Pozycja</th>
                <th className="p-2 font-extralight">Nazwa</th>
                <th className="p-2 font-extralight">Ilość</th>
                <th className="p-2 font-extralight">Waga</th>
                <th className="p-2 font-extralight">VIP</th>
                <th className="p-2 font-extralight">Oznakowane</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(currentPosition)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <input className="rounded border p-1" />
                  </td>
                  <td className="p-2">
                    <input type="number" className="rounded border p-1" />
                  </td>
                  <td className="p-2">
                    <input type="number" className="rounded border p-1" />
                  </td>
                  <td className="p-2">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2">
                    <input type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CardTable;
