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

  return (
    <div className="flex h-screen items-center justify-center overflow-x-auto">
      {cardNumber && warehouse && inventoryTaker1 && inventoryTaker2 && (
        <form className="w-full max-w-md">
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={wipChecked}
                onChange={(e) => setWipChecked(e.target.checked)}
              />
              WIP
            </label>
          </div>

          <div className="mb-4">
            <label>
              Numer - Nazwa:
              {articlesLoading ? (
                <span>Loading...</span>
              ) : (
                <Select
                  options={options}
                  className="w-full"
                  placeholder="Wybierz"
                  menuPortalTarget={document.body}
                  onChange={(selected) => handleArticleChange(selected)}
                />
              )}
            </label>
          </div>

          <div className="mb-4">
            <label>
              Ilość / Waga:
              {selectedArticle.name ? (
                <div className="flex items-center">
                  <input
                    type="number"
                    value={inputValue}
                    className="mr-2 w-full rounded border p-2 text-right"
                    placeholder={
                      selectedArticle.unit === 'st'
                        ? 'Podaj ilość'
                        : selectedArticle.unit === 'kg'
                        ? 'Podaj wagę'
                        : selectedArticle.unit === 'l'
                        ? 'Podaj litraż'
                        : ''
                    }
                    onChange={handleInputChange}
                  />
                  <p className="mr-2">
                    {selectedArticle.unit === 'st'
                      ? 'sztuk'
                      : selectedArticle.unit === 'kg'
                      ? 'kg'
                      : selectedArticle.unit === 'l'
                      ? 'litrów'
                      : ''}
                  </p>
                  {selectedArticle.converter && <p>= {calculatedValue} st</p>}
                </div>
              ) : (
                <p className="text-red-500">Najpierw wybierz artykuł</p>
              )}
            </label>
          </div>

          <div className="mb-4">
            <button className="rounded bg-blue-500 py-2 px-4 text-white">
              Wydruk
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default PositionForm
