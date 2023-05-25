import React, { createContext, useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'

export const Context = createContext()

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? storedValue : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

export const Provider = ({ children }) => {
  const [cardNumber, setCardNumber] = useLocalStorageState('cardNumber', '')
  const [warehouse, setWarehouse] = useLocalStorageState('warehouse', '')
  const [inventoryTaker1, setInventoryTaker1] = useLocalStorageState(
    'inventoryTaker1',
    ''
  )
  const [inventoryTaker2, setInventoryTaker2] = useLocalStorageState(
    'inventoryTaker2',
    ''
  )

  const [positionNumber, setPositionNumber] = useState(1)
  const [currentPositionData, setCurrentPositionData] = useState(null)
  const [positionOptions, setPositionOptions] = useState([])

  useEffect(() => {
    if (cardNumber && positionNumber) {
      getPositions.mutate()
    }
  }, [cardNumber, positionNumber])

  useEffect(() => {
    if (cardNumber && positionNumber) {
      getCurrentPositionData.mutate()
    }
  }, [cardNumber, positionNumber])

  const resetContext = () => {
    setCardNumber('')
    setWarehouse('')
    setInventoryTaker1('')
    setInventoryTaker2('')
    setPositionNumber(1)

    localStorage.removeItem('cardNumber')
    localStorage.removeItem('warehouse')
    localStorage.removeItem('inventoryTaker1')
    localStorage.removeItem('inventoryTaker2')
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
        const newCardNumber =
          variables.cardNumber === 'lowestAvailable'
            ? data.cardNumber
            : variables.cardNumber
        setCardNumber(newCardNumber)
        setWarehouse(variables.warehouse)
        setInventoryTaker1(variables.inventoryTaker1)
        setInventoryTaker2(variables.inventoryTaker2)

        if (Array.isArray(data) && data.length > 0) {
          const lastPositionNumber = data[data.length - 1]
          setPositionNumber(lastPositionNumber + 1)
        }
      },
    }
  )

  const closeCard = useMutation(async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/inventory/close-card`, {
      cardNumber,
    })
    resetContext()
  })

  const getPositions = useMutation(
    async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/inventory/get-position-options/${cardNumber}`
        )
        return response.data
      } catch (error) {
        throw new Error('Error fetching positions')
      }
    },
    {
      onSuccess: (data) => {
        const highestValue = data.length !== 0 && Math.max(...data)
        setPositionOptions(
          data.length !== 0
            ? [...data, highestValue + 1]
            : currentPositionData
            ? [1, 2]
            : [1]
        )
      },
    }
  )

  const getCurrentPositionData = useMutation(
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/inventory/get-position-data/${cardNumber}/${positionNumber}`
      )
      return response.data
    },
    {
      onSuccess: (data) => {
        setCurrentPositionData(data)
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
    closeCard,
    getPositions,
    getCurrentPositionData,
    currentPositionData,
    positionOptions,
    positionNumber,
    setPositionNumber,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
