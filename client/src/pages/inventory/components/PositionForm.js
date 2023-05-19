import React, { useState, useContext, useEffect } from 'react'
import Select from 'react-select'

import { Context } from '../Context'
import useArticles from '../hooks/useArticles'

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
    cardData,
    setPositionNumber,
    positionNumber,
  } = useContext(Context)

  const { data: articles, isLoading: articlesLoading } = useArticles()

  const [options, setOptions] = useState([])

  useEffect(() => {
    if (!articlesLoading) {
      const mappedOptions = articles.map((article) => ({
        value: article.number,
        label: `${article.number} - ${article.name}`,
      }))
      setOptions(mappedOptions)
    }
  }, [articles, articlesLoading])

  useEffect(() => {
    // Check if cardData exists and contains a position with the desired positionNumber
    if (cardData && cardData.positions) {
      const position = cardData.positions.find(
        (pos) => pos.positionNumber === positionNumber
      )
      // Use the position data to populate the form fields
      if (position) {
        // Set the selected article
        // Assuming you have an `article` state variable and a corresponding setter
        setArticle(position.article)
        // Set the quantity
        // Assuming you have a `quantity` state variable and a corresponding setter
        setQuantity(position.quantity)
        // Set the WIP checkbox
        // Assuming you have a `isWip` state variable and a corresponding setter
        setIsWip(position.wip)
      } else {
        // Clear the form fields if no matching position found
        setArticle(null)
        setQuantity('')
        setIsWip(false)
      }
    }
  }, [cardData, positionNumber])

  const [article, setArticle] = useState(null)
  const [quantity, setQuantity] = useState('')
  const [isWip, setIsWip] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission
    // ...
    console.log(article)
  }

  return (
    <>
      {cardNumber && warehouse && inventoryTaker1 && inventoryTaker2 && (
        <div className="mx-auto w-full max-w-sm">
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
                value={article} // Set the selected article value
                onChange={(selectedOption) => setArticle(selectedOption)}
              />
            </div>
            <div className="mb-8">
              <label className="text-xl font-thin tracking-widest text-gray-700">
                ilość:
              </label>
              <div className="mb-4">
                <input
                  className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
                  type="number"
                  value={quantity} // Set the quantity value
                  onChange={(event) => setQuantity(event.target.value)}
                  placeholder={article}
                />
              </div>
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
                zapisz
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
                zmień pozycję:
              </label>
              {cardData && cardData.positions ? ( // Check if cardData and positions are available
                <Select
                  options={cardData.positions} // Use positions from cardData
                  getOptionLabel={(option) =>
                    `Position ${option.positionNumber}`
                  }
                  getOptionValue={(option) => option.positionNumber}
                  value={selectedPosition}
                  onChange={handlePositionChange}
                  styles={customStylesSelect}
                  placeholder="Select Position"
                />
              ) : (
                <div>Brak pozycji w bazie - nowa karta</div>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default PositionForm
