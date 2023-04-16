import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Context";

const Form = (props) => {
  const warehouses = [
    { value: "000", label: "Standard" },
    { value: "035", label: "Stal niefosforanowana z Chin" },
    { value: "055", label: "Zablokowane w Galvano" },
    { value: "111", label: "Dział Launch" },
    { value: "222", label: "Zablokowane produkcja" },
  ];

  const inventoryTakers = [
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Robert Brown", label: "Robert Brown" },
    { value: "Olivia Taylor", label: "Olivia Taylor" },
  ];

  const [tempCardNumber, setTempCardNumber] = useState("lowestAvailable");
  const [tempWarehouse, setTempWarehouse] = useState("000");
  const [tempInventoryTaker1, setTempInventoryTaker1] = useState("");
  const [tempInventoryTaker2, setTempInventoryTaker2] = useState("");
  const { setValues } = useContext(Context);
  const [cards, setCards] = useState({
    inUse: [],
    alreadyUsed: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const cardsData = await fetchCardsByStatus();
      setCards(cardsData);
    };

    fetchData();
  }, []);

  const fetchCardsByStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/inventory/get-cards-by-status`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cards by status:", error);
    }
  };

  const getWarehouseForCardNumber = () => {
    const foundCard =
      cards.inUse.find((card) => card.cardNumber == tempCardNumber) ||
      cards.alreadyUsed.find((card) => card.cardNumber == tempCardNumber);

    return foundCard ? foundCard.warehouse : null;
  };

  const shouldShowWarehouse = () => {
    return !(
      cards.inUse.some((card) => card.cardNumber == tempCardNumber) ||
      cards.alreadyUsed.some((card) => card.cardNumber == tempCardNumber)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      tempCardNumber &&
      tempWarehouse &&
      tempInventoryTaker1 &&
      tempInventoryTaker2
    ) {
      setValues(
        tempCardNumber,
        tempWarehouse,
        tempInventoryTaker1,
        tempInventoryTaker2
      );
      props.onSuccess();
    } else {
      alert("Please fill out all fields.");
    }
  };
  return (
    <div className="mb-6">
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <p className="mb-2">Wybierz numer karty do zarezerwowania:</p>
          <select
            id="card-number"
            value={tempCardNumber}
            onChange={(e) => setTempCardNumber(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          >
            <option value="lowestAvailable">pierwsza wolna</option>
            <optgroup label="Aktualnie zajęte">
              {cards.inUse.map((card) => (
                <option key={card.cardNumber} value={card.cardNumber}>
                  {card.cardNumber}
                </option>
              ))}
            </optgroup>
            <optgroup label="Zakończone">
              {cards.alreadyUsed.map((card) => (
                <option key={card.cardNumber} value={card.cardNumber}>
                  {card.cardNumber}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div className="mb-4">
          {shouldShowWarehouse() ? (
            <>
              <p className="mb-2">
                Pozycje z karty zostaną przypisane do magazynu:
              </p>
              <select
                id="warehouse"
                value={tempWarehouse}
                onChange={(e) => setTempWarehouse(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
              >
                {warehouses.map((warehouse) => (
                  <option key={warehouse.value} value={warehouse.value}>
                    {warehouse.value} - {warehouse.label}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <p className="mb-2">
              Wybrałeś wcześniej utworzoną kartę. Magazyn{" "}
              {getWarehouseForCardNumber()} nie może być zmieniony!
            </p>
          )}
        </div>
        <div className="">
          <p className="mb-2">Wskaż osoby inwentaryzujące:</p>
          <select
            id="inventory-taker-1"
            value={tempInventoryTaker1}
            onChange={(e) => setTempInventoryTaker1(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          >
            <option disabled hidden value="">
              osoba 1
            </option>
            {inventoryTakers.map((taker) => (
              <option key={taker.value} value={taker.value}>
                {taker.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="inventory-taker-2"
            value={tempInventoryTaker2}
            onChange={(e) => setTempInventoryTaker2(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          >
            <option disabled hidden value="">
              osoba 2
            </option>
            {inventoryTakers.map((taker) => (
              <option key={taker.value} value={taker.value}>
                {taker.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-2/5 rounded bg-gray-200 py-2 px-4 font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
        >
          potwierdź
        </button>
      </form>
    </div>
  );
};

export default Form;
