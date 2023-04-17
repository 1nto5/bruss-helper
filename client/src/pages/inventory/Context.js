import React, { createContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import axios from "axios";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [cardNumber, setCardNumber] = useState(
    () => localStorage.getItem("cardNumber") || ""
  );
  const [warehouse, setWarehouse] = useState(
    () => localStorage.getItem("warehouse") || "000"
  );
  const [inventoryTakers, setInventoryTakers] = useState(
    () => localStorage.getItem("inventoryTakers") || ""
  );

  useEffect(() => {
    localStorage.setItem("cardNumber", cardNumber);
  }, [cardNumber]);

  useEffect(() => {
    localStorage.setItem("warehouse", warehouse);
  }, [warehouse, cardNumber]);

  useEffect(() => {
    localStorage.setItem("inventoryTakers", inventoryTakers);
  }, [inventoryTakers]);

  const resetContext = () => {
    // Reset state
    setCardNumber("");
    setWarehouse("000");
    setInventoryTakers("");

    // Clear localStorage
    localStorage.removeItem("cardNumber");
    localStorage.removeItem("warehouse");
    localStorage.removeItem("inventoryTakers");
  };

  const reserveCardMutation = useMutation(
    async ({ cardNumber, warehouse, inventoryTakers }) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/inventory/reserve-card`,
        {
          cardNumber,
          warehouse,
          inventoryTakers,
        }
      );
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        if (variables.cardNumber === "lowestAvailable") {
          setCardNumber(data.cardNumber);
        } else {
          setCardNumber(variables.cardNumber);
        }
        console.log(variables.inventoryTakers);
        setWarehouse(variables.warehouse);
        setInventoryTakers(variables.inventoryTakers);
      },
    }
  );

  const value = {
    cardNumber,
    setCardNumber,
    warehouse,
    setWarehouse,
    inventoryTakers,
    setInventoryTakers,
    resetContext,
    reserveCardMutation,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
