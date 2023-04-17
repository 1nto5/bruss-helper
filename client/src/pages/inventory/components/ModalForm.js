import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Context";

const Form = (props) => {
  const warehouses = [
    { value: "S1", label: "S1" },
    { value: "S2", label: "S2" },
    { value: "S3", label: "S3" },
    { value: "S4", label: "S4" },
    { value: "S5", label: "S5" },
    { value: "S6", label: "S6" },
  ];

  const inventoryTakers = [
    { value: "Adrian Antosiak", label: "Adrian Antosiak" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Robert Brown", label: "Robert Brown" },
    { value: "Olivia Taylor", label: "Olivia Taylor" },
  ];

  const [formCardNumber, setFormCardNumber] = useState("lowestAvailable");
  const [formWarehouse, setFormWarehouse] = useState("000");
  const [formInventoryTaker1, setFormInventoryTaker1] = useState("");
  const [formInventoryTaker2, setFormInventoryTaker2] = useState("");
  const { reserveCardMutation } = useContext(Context);
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
      cards.inUse.find((card) => card.cardNumber == formCardNumber) ||
      cards.alreadyUsed.find((card) => card.cardNumber == formCardNumber);

    return foundCard ? foundCard.warehouse : null;
  };

  const shouldShowWarehouse = () => {
    return !(
      cards.inUse.some((card) => card.cardNumber == formCardNumber) ||
      cards.alreadyUsed.some((card) => card.cardNumber == formCardNumber)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formCardNumber &&
      formWarehouse &&
      formInventoryTaker1 &&
      formInventoryTaker2
    ) {
      reserveCardMutation.mutate({
        cardNumber: formCardNumber,
        warehouse: formWarehouse,
        inventoryTaker1: formInventoryTaker1,
        inventoryTaker2: formInventoryTaker2,
      });
      props.closeModal();
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
            value={formCardNumber}
            onChange={(e) => setFormCardNumber(e.target.value)}
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
                value={formWarehouse}
                onChange={(e) => setFormWarehouse(e.target.value)}
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
          <p className="mb-2">Wskaż grupę inwentaryzującą:</p>
          <select
            id="inventory-taker-1"
            value={formInventoryTaker1}
            onChange={(e) => setFormInventoryTaker1(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          >
            <option disabled hidden value="">
              wybierz
            </option>
            {inventoryTakers.map((taker) => (
              <option key={taker.value} value={taker.value}>
                {taker.label}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <select
            id="inventory-taker-2"
            value={formInventoryTaker2}
            onChange={(e) => setFormInventoryTaker2(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          >
            <option disabled hidden value="">
              wybierz
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
