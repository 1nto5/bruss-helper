import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { Context } from '../Context'
import useArticles from '../hooks/useArticles'
import LoadingAnimation from './LoadingAnimation'

const customStylesSelect = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '0.5rem', // rounded-lg in tailwind
    borderColor: state.isFocused ? '#8bb63b' : '#d1d5db', // border changes to bruss color on focus
    boxShadow: state.isFocused ? '0 0 0 0.5px #8bb63b' : '', // ring-2 and ring-bruss on focus
    padding: '0.45rem 0.5rem',
    '&:hover': {
      borderColor: state.isFocused ? '#8bb63b' : '#d1d5db', // border changes to bruss color on hover when focused
    },
    outline: 'none', // focus:outline-none
  }),
}
const PositionForm = () => {
  const {
    cardNumber,
    warehouse,
    inventoryTaker1,
    inventoryTaker2,
    setPositionNumber,
    positionNumber,
    reserveCard,
    getPositions,
    getCurrentPositionData,
    currentPositionData,
    positionOptions,
  } = useContext(Context)

  const { data: articles, isLoading: articlesLoading } = useArticles()
  const [options, setOptions] = useState([])
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [quantity, setQuantity] = useState('')
  const [isWip, setIsWip] = useState(false)
  const [unit, setUnit] = useState(null)
  const [converter, setConverter] = useState(null)
  const [selectedArticleName, setSelectedArticleName] = useState(null)
  const [selectedArticleNumber, setSelectedArticleNumber] = useState(null)
  const [labelPrinted, setLabelPrinted] = useState(false) // TODO
  const [selectedPosition, setSelectedPosition] = useState(null)

  useEffect(() => {
    if (!articlesLoading) {
      const mappedOptions = articles.map((article) => ({
        value: article.number,
        label: `${article.number} - ${article.name}`,
      }))
      setOptions(mappedOptions)
    }
  }, [articles])

  useEffect(() => {
    if (selectedArticle && articles) {
      const selectedArticleObject = articles.find(
        (article) => article.number === selectedArticle.value
      )
      if (selectedArticleObject) {
        setUnit(selectedArticleObject.unit) // Set the unit for the selected article
        selectedArticleObject.converter
          ? setConverter(selectedArticleObject.converter)
          : setConverter(null)
        setSelectedArticleNumber(selectedArticleObject.number)
        setSelectedArticleName(selectedArticleObject.name)
      }
    }
  }, [selectedArticle])

  useEffect(() => {
    if (currentPositionData) {
      setSelectedArticle({
        value: currentPositionData.articleNumber,
        label: `${currentPositionData.articleNumber} - ${currentPositionData.articleName}`,
      })
      setSelectedArticleNumber(currentPositionData.articleNumber)
      setSelectedArticleName(currentPositionData.articleName)
      setQuantity(currentPositionData.quantity.toString())
      setUnit(currentPositionData.unit)
      setIsWip(currentPositionData.wip)
    }
  }, [currentPositionData])

  const resetForm = () => {
    setSelectedArticle(null)
    setQuantity('')
    setIsWip(false)
    setUnit(null)
    setConverter(null)
    setSelectedArticleName(null)
    setSelectedArticleNumber(null)
    setLabelPrinted(false)
  }

  useEffect(() => {
    resetForm()
  }, [cardNumber, positionNumber])

  const handlePositionChange = (selectedOption) => {
    setSelectedPosition(selectedOption)
    setPositionNumber(selectedOption.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedArticle || !quantity) {
      // TODO
      // Check if required fields are filled
      // Handle error or validation message
      return
    }

    const position = {
      cardNumber: cardNumber,
      positionNumber: positionNumber,
      articleNumber: selectedArticleNumber,
      articleName: selectedArticleName,
      quantity: !converter ? quantity : Math.floor(quantity * converter),
      unit: unit,
      inventoryTakers: [inventoryTaker1, inventoryTaker2],
      wip: isWip,
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/inventory/save-position`,
        position
      )
      const savedPosition = response.data

      // Handle success, display confirmation message, or perform any necessary actions
      console.log('Position saved:', savedPosition) // TODO

      setPositionNumber((prevPositionNumber) => {
        const newPositionNumber = prevPositionNumber + 1
        return newPositionNumber <= 25 ? newPositionNumber : prevPositionNumber
      })
    } catch (error) {
      // Handle error, display error message, or perform error-related actions
      console.error('Error saving position:', error)
    }
  }

  return (
    <>
      {!reserveCard.isLoading &&
        cardNumber &&
        warehouse &&
        inventoryTaker1 &&
        inventoryTaker2 && (
          <div className="mx-auto w-full max-w-sm">
            {getCurrentPositionData.isLoading ? (
              <LoadingAnimation />
            ) : (
              <form
                className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-lg"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label className="text-xl font-thin tracking-widest text-gray-700">
                    artykuł:
                  </label>
                  <Select
                    options={options}
                    styles={customStylesSelect}
                    placeholder={<div></div>}
                    value={selectedArticle} // Set the selected article value
                    onChange={(selectedOption) =>
                      setSelectedArticle(selectedOption)
                    }
                  />
                </div>
                <div className="mb-8">
                  <label className="text-xl font-thin tracking-widest text-gray-700">
                    {!converter
                      ? unit === 'st'
                        ? 'ilość sztuk'
                        : 'waga (kg)'
                      : 'waga (kg)'}
                    :
                  </label>
                  <div className="mb-4">
                    <input
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
                      type="number"
                      value={quantity} // Set the quantity value
                      onChange={(event) => setQuantity(event.target.value)}
                      placeholder={
                        unit
                          ? `wprowadź ${unit === 'st' ? 'ilość sztuk' : 'wagę'}`
                          : 'najpierw wybierz artykuł'
                      }
                    />
                  </div>
                  {converter && (
                    <span className="text-lg font-bold text-red-500">
                      {`${quantity} kg ~ ${Math.floor(
                        quantity * converter
                      )} sztuk`}
                    </span>
                  )}
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <button
                    className="rounded bg-gray-200 py-2 px-6 text-center text-xl font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-orange-400"
                    type="button"
                  >
                    etykieta
                  </button>
                  <button
                    className="rounded bg-gray-200 py-2 px-6 text-center text-xl font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
                    type="submit"
                  >
                    {currentPositionData ? 'zapisz zmiany' : 'uwtórz pozycję'}
                  </button>
                </div>
                <div className="mt-8 flex items-center">
                  <input
                    className="mr-2 h-5 w-5 "
                    type="checkbox"
                    checked={isWip} // Set the WIP checkbox checked state
                    onChange={(event) => setIsWip(event.target.checked)}
                  />
                  <span className="text-sm">WIP</span>
                </div>

                <div className="mt-4">
                  <label className="text-xl font-thin tracking-widest text-gray-700">
                    {'zmień pozycję'}:
                  </label>
                  {!getPositions.isLoading ? (
                    positionOptions ? (
                      <Select
                        options={positionOptions.map((option) => ({
                          value: option,
                          label: option,
                        }))}
                        placeholder={<div></div>}
                        value={positionNumber}
                        onChange={handlePositionChange}
                        styles={customStylesSelect}
                        menuPlacement="top"
                      />
                    ) : (
                      <div>brak pozycji w karcie</div>
                    )
                  ) : (
                    <div>ładowanie...</div>
                  )}
                </div>
              </form>
            )}
          </div>
        )}
    </>
  )
}

export default PositionForm
