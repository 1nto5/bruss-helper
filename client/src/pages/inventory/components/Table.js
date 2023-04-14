import React, { useState, useContext } from "react";

import { Context } from "../Context";

const CardTable = () => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const { cardNumber, warehouse } = useContext(Context);

  const handleLabelConfirmation = () => {
    if (currentPosition < 25) {
      setCurrentPosition(currentPosition + 1);
    } else {
      alert("Card is full. Please start a new card.");
    }
  };

  return (
    <div className="mt-4 shadow-lg">
      {cardNumber ? (
        <>
          <h2 className="mb-4 text-xl font-bold">
            Numer karty: {cardNumber} Magazyn numer: {warehouse}
          </h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-left text-gray-50">
                <th className="p-2 font-extralight">Position</th>
                <th className="p-2 font-extralight">Article</th>
                <th className="p-2 font-extralight">Quantity/Weight</th>
                <th className="p-2 font-extralight">VIP</th>
                <th className="p-2 font-extralight">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(currentPosition)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2"></td>
                  <td className="p-2">
                    <input type="number" className="rounded border p-1" />
                  </td>
                  <td className="p-2">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={handleLabelConfirmation}
                      className="rounded bg-blue-500 py-1 px-3 font-bold text-white hover:bg-blue-700"
                    >
                      Confirm Label Placement
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-lg font-light">Please select a card to begin.</p>
      )}
    </div>
  );
};

export default CardTable;
