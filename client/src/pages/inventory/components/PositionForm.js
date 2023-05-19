import React, { useState, useContext, useEffect } from 'react'
import Select from 'react-select'

import { Context } from '../Context'
import useArticles from '../hooks/useArticles'
import useCard from '../hooks/useCard'

const PositionForm = () => {
  const { cardNumber, warehouse, inventoryTaker1, inventoryTaker2 } =
    useContext(Context)

  const { data: card } = useCard(cardNumber)
  const { data: articles, isLoading: articlesLoading } = useArticles()

  const [options, setOptions] = useState([])
  const [wipChecked, setWipChecked] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [calculatedValue, setCalculatedValue] = useState(0)

  useEffect(() => {
    if (!articlesLoading) {
      const mappedOptions = articles.map((article) => ({
        value: article.number,
        label: `${article.number} - ${article.name}`,
      }))
      setOptions(mappedOptions)
    }
  }, [articles, articlesLoading])

  const handleArticleChange = (selectedOption) => {
    const article = articles.find(
      (article) => article.number === selectedOption.value
    )
    if (article) {
      setSelectedArticle(article)
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
    selectedArticle.converter &&
      setCalculatedValue(
        Math.floor(event.target.value * selectedArticle.converter)
      )
  }

  const [checked, setChecked] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [quantity, setQuantity] = useState('')

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked)
  }

  const handleSelectChange = (option) => {
    setSelectedOption(option)
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value)
  }

  const handlePrintLabel = () => {
    // Logic to print the label
    console.log('Print label')
  }

  const handleSave = () => {
    // Logic to save the form data
    console.log('Save form data')
  }

  return (
    <div className="mx-auto max-w-md rounded bg-gray-100 p-4 shadow">
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            className="form-checkbox mr-2 text-blue-500"
          />
          <span>WIP</span>
        </label>
      </div>
      <div className="mb-4">
        <Select
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Ilość / waga:</label>
        <input
          type="text"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <button
          onClick={handlePrintLabel}
          className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Print Label
        </button>
        <button
          onClick={handleSave}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default PositionForm
