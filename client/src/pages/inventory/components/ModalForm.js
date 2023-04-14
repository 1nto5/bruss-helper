import React, { useState, useEffect, useContext } from "react";

import { Context } from "../Context";

const Form = (props) => {
  const [tempCardNumber, setTempCardNumber] = useState("");
  const [tempWarehouse, setTempWarehouse] = useState("000");
  const [tempInventoryTaker1, setTempInventoryTaker1] = useState("");
  const [tempInventoryTaker2, setTempInventoryTaker2] = useState("");

  const [availableCards, setAvailableCards] = useState([]);
  const { setValues } = useContext(Context);

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

  useEffect(() => {
    const fetchAvailableCards = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/inventory/cards-in-use`
        );
        const reservedCards = await response.json();
        const allCards = Array.from({ length: 999 }, (_, i) => i + 1);
        const filteredCards = allCards.filter(
          (card) => !reservedCards.includes(card)
        );
        setAvailableCards(filteredCards);
      } catch (error) {
        console.error("Error fetching available cards:", error);
      }
    };

    fetchAvailableCards();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      tempCardNumber !== "" &&
      tempWarehouse !== "" &&
      tempInventoryTaker1 !== "" &&
      tempInventoryTaker2 !== ""
    ) {
      // Set form values into context using setAllValues function
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
          <label className="mr-2" htmlFor="card-number">
            Numer karty:
          </label>
          <select
            id="card-number"
            value={tempCardNumber}
            onChange={(e) => setTempCardNumber(e.target.value)}
            className="w-5/6 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          >
            <option value="">wybierz</option>
            {availableCards.map((card) => (
              <option key={card} value={card}>
                {card}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="mr-2" htmlFor="warehouse">
            Magazyn:
          </label>
          <select
            id="warehouse"
            value={tempWarehouse}
            onChange={(e) => setTempWarehouse(e.target.value)}
            className="w-5/6 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          >
            {warehouses.map((warehouse) => (
              <option key={warehouse.value} value={warehouse.value}>
                {warehouse.value} - {warehouse.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="mr-2" htmlFor="inventory-taker-1">
            Osoba inwentaryzująca 1:
          </label>
          <select
            id="inventory-taker-1"
            value={tempInventoryTaker1}
            onChange={(e) => setTempInventoryTaker1(e.target.value)}
            className="w-5/6 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          >
            <option value="">wybierz</option>
            {inventoryTakers.map((taker) => (
              <option key={taker.value} value={taker.value}>
                {taker.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="mr-2" htmlFor="inventory-taker-2">
            Osoba inwentaryzująca 2:
          </label>
          <select
            id="inventory-taker-2"
            value={tempInventoryTaker2}
            onChange={(e) => setTempInventoryTaker2(e.target.value)}
            className="w-5/6 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          >
            <option value="">wybierz</option>
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
          Wybierz kartę
        </button>
      </form>
    </div>
  );
};

export default Form;
