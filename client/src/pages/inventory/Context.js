import React, { createContext, useState, useEffect } from "react"
import { useMutation } from "react-query"
import axios from "axios"

export const Context = createContext()

export const Provider = ({ children }) => {
  const [cardNumber, setCardNumber] = useState(
    () => localStorage.getItem("cardNumber") || ""
  )
  const [warehouse, setWarehouse] = useState(
    () => localStorage.getItem("warehouse") || "000"
  )
  const [inventoryTaker1, setInventoryTaker1] = useState(
    () => localStorage.getItem("inventoryTaker1") || ""
  )
  const [inventoryTaker2, setInventoryTaker2] = useState(
    () => localStorage.getItem("inventoryTaker2") || ""
  )

  useEffect(() => {
    localStorage.setItem("cardNumber", cardNumber)
  }, [cardNumber])

  useEffect(() => {
    localStorage.setItem("warehouse", warehouse)
  }, [warehouse, cardNumber])

  useEffect(() => {
    localStorage.setItem("inventoryTaker1", inventoryTaker1)
  }, [inventoryTaker1])

  useEffect(() => {
    localStorage.setItem("inventoryTaker2", inventoryTaker2)
  }, [inventoryTaker2])

  const resetContext = () => {
    // Reset state
    setCardNumber("")
    setWarehouse("000")
    setInventoryTaker1("")
    setInventoryTaker2("")

    // Clear localStorage
    localStorage.removeItem("cardNumber")
    localStorage.removeItem("warehouse")
    localStorage.removeItem("inventoryTaker1")
    localStorage.removeItem("inventoryTaker2")
  }

  const reserveCard = useMutation(
    async ({ cardNumber, warehouse, inventoryTaker1, inventoryTaker2 }) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/inventory/reserve-card`,
        {
          cardNumber,
          warehouse,
          inventoryTaker1,
          inventoryTaker2,
        }
      )
      return response.data
    },
    {
      onSuccess: (data, variables) => {
        if (variables.cardNumber === "lowestAvailable") {
          setCardNumber(data.cardNumber)
        } else {
          setCardNumber(variables.cardNumber)
        }
        setWarehouse(variables.warehouse)
        setInventoryTaker1(variables.inventoryTaker1)
        setInventoryTaker2(variables.inventoryTaker2)
      },
    }
  )

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
    reserveCard,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
