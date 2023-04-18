import React, { useState, useContext } from "react";

import { Context } from "../Context";

const CardTable = () => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const { cardNumber, warehouse, inventoryTaker1, inventoryTaker2, articles } =
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

  const handleNumberChange = (index, number) => {
    const article = articles.find((article) => article.number === number);
    if (article) {
      // Update the corresponding name input
      const nameInput = document.getElementById(`name-input-${index}`);
      nameInput.value = article.name;
    }
  };

  return (
    <div className="overflow-x-auto">
      {cardNumber && warehouse && inventoryTaker1 && inventoryTaker2 && (
        <>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-left text-gray-50">
                <th className="min-w-[80px] p-2 font-extralight">Pozycja</th>
                <th className="min-w-[200px] p-2 font-extralight">Numer</th>
                <th className="min-w-[200px] p-2 font-extralight">Nazwa</th>
                <th className="min-w-[100px] p-2 font-extralight">Ilość</th>
                <th className="min-w-[100px] p-2 font-extralight">Waga</th>
                <th className="min-w-[80px] p-2 font-extralight">VIP</th>
                <th className="min-w-[120px] p-2 font-extralight">
                  Oznakowane
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(currentPosition)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2">{index + 1}</td>

                  <td className="p-2">
                    <input
                      id={`name-input-${index}`}
                      className="rounded border p-1"
                      readOnly
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="rounded border p-1"
                      onChange={(event) =>
                        handleNumberChange(index, parseInt(event.target.value))
                      }
                    />
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
