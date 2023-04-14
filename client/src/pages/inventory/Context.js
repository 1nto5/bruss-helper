import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [cardNumber, setCardNumber] = useState(
    () => localStorage.getItem("cardNumber") || ""
  );
  const [warehouse, setWarehouse] = useState(
    () => localStorage.getItem("warehouse") || "000"
  );
  const [inventoryTaker1, setInventoryTaker1] = useState(
    () => localStorage.getItem("inventoryTaker1") || ""
  );
  const [inventoryTaker2, setInventoryTaker2] = useState(
    () => localStorage.getItem("inventoryTaker2") || ""
  );

  useEffect(() => {
    localStorage.setItem("cardNumber", cardNumber);
  }, [cardNumber]);

  useEffect(() => {
    localStorage.setItem("warehouse", warehouse);
  }, [warehouse]);

  useEffect(() => {
    localStorage.setItem("inventoryTaker1", inventoryTaker1);
  }, [inventoryTaker1]);

  useEffect(() => {
    localStorage.setItem("inventoryTaker2", inventoryTaker2);
  }, [inventoryTaker2]);

  const resetContext = () => {
    // Reset state
    setCardNumber("");
    setWarehouse("000");
    setInventoryTaker1("");
    setInventoryTaker2("");

    // Clear localStorage
    localStorage.removeItem("cardNumber");
    localStorage.removeItem("warehouse");
    localStorage.removeItem("inventoryTaker1");
    localStorage.removeItem("inventoryTaker2");
  };

  const setValues = async (
    newCardNumber,
    newWarehouse,
    newInventoryTaker1,
    newInventoryTaker2
  ) => {
    setCardNumber(newCardNumber);
    setWarehouse(newWarehouse);
    setInventoryTaker1(newInventoryTaker1);
    setInventoryTaker2(newInventoryTaker2);

    // Call the function to create the Card document
    await reserveCard(
      newCardNumber,
      newWarehouse,
      newInventoryTaker1,
      newInventoryTaker2
    );
  };

  const reserveCard = async (
    cardNumber,
    warehouse,
    inventoryTaker1,
    inventoryTaker2
  ) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/inventory/reserve-card`,
        {
          cardNumber,
          warehouse,
          inventoryTakers: [inventoryTaker1, inventoryTaker2],
        }
      );
    } catch (error) {
      console.error("Error reserving card:", error);
    }
  };

  const value = {
    cardNumber,
    setCardNumber,
    warehouse,
    setWarehouse,
    inventoryTaker1,
    setInventoryTaker1,
    inventoryTaker2,
    setInventoryTaker2,
    resetContext,
    setValues,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
