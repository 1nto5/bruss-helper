import React, { useState, useContext, useEffect } from 'react'
import Select from 'react-select'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import { Context } from '../Context'
import useArticles from '../hooks/useArticles'
import useCard from '../hooks/useCard'

const CardTable = () => {
  const [currentPosition] = useState(25)
  const { cardNumber, warehouse, inventoryTaker1, inventoryTaker2 } =
    useContext(Context)

  const { data: card, cardLoading, cardError } = useCard(cardNumber)

  const {
    data: articles,
    isLoading: articlesLoading,
    error: articlesError,
  } = useArticles()

  const [options, setOptions] = useState([])
  const [selectedArticle, setSelectedArticle] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [calculatedValue, setCalculatedValue] = useState(0)
  const [positionState, setPositionState] = useState(
    [true].concat(Array(24).fill(false))
  )

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

  const closePosition = (index, event) => {
    if (event.target.checked) {
      setPositionState((prevState) => {
        const newState = [...prevState]
        if (index < 24) {
          newState[index + 1] = true
        }
        return newState
      })
    }
  }

  const togglePosition = (index, event) => {
    setPositionState((prevState) => {
      const newState = [...prevState]
      newState[index] = event.target.checked
      if (event.target.checked && index < 24) {
        newState[index + 1] = true
      }
      return newState
    })
  }

  return (
    <div className="overflow-x-auto">
      {cardNumber && warehouse && inventoryTaker1 && inventoryTaker2 && (
        <>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 tracking-widest text-gray-50">
                <th className="w-1/12 p-2 font-extralight">WIP</th>
                <th className="w-1/12 p-2 font-extralight">p.</th>
                <th className="min-w-[300px] p-2 font-extralight">
                  numer - nazwa
                </th>
                <th className="w-4/12 min-w-[200px] p-2 font-extralight">
                  ilość / waga
                </th>
                <th className="w-1/12 p-2 font-extralight">etykieta</th>
                <th className="w-1/12 p-2 font-extralight">oznacz</th>
              </tr>
            </thead>

            <tbody>
              {[...Array(currentPosition)].map((_, index) => (
                <tr key={index} className="border-gray-200 text-center">
                  <td className="border-r-2 p-2 text-center">
                    <input
                      type="checkbox"
                      className="h-6 w-6"
                      disabled={!positionState[index]}
                      onChange={(event) => closePosition(index, event)}
                    />
                  </td>
                  <td className="max-w-[20px] border-r-2 p-2">{index + 1}</td>
                  <td className="border-r-2 p-2 px-8 ">
                    {articlesLoading ? (
                      <span>Loading...</span>
                    ) : (
                      <Select
                        options={options}
                        className="text-left"
                        placeholder="wybierz"
                        menuPortalTarget={document.body}
                        onChange={(selected) => handleArticleChange(selected)}
                        isDisabled={!positionState[index]}
                      />
                    )}
                  </td>
                  <td className="border-r-2 p-2">
                    {selectedArticle.name ? (
                      <div className="flex items-center justify-center">
                        <input
                          type="number"
                          value={inputValue}
                          className="w-full max-w-[150px] rounded border p-2 text-right"
                          placeholder={
                            selectedArticle.unit === 'st'
                              ? 'podaj ilość'
                              : selectedArticle.unit === 'kg'
                              ? 'podaj wagę'
                              : selectedArticle.unit === 'l'
                              ? 'podaj litraż'
                              : ''
                          }
                          onChange={handleInputChange}
                          disabled={!positionState[index]}
                        />
                        <p className="ml-2">
                          {selectedArticle.unit === 'st'
                            ? 'sztuk'
                            : selectedArticle.unit === 'kg'
                            ? 'kg'
                            : selectedArticle.unit === 'l'
                            ? 'litrów'
                            : ''}
                        </p>
                        {selectedArticle.converter && (
                          <p className="ml-1">= {calculatedValue} st</p>
                        )}
                      </div>
                    ) : (
                      <p className="tracking-wider text-red-500">
                        najpierw wybierz artykuł
                      </p>
                    )}
                  </td>
                  <td className="p-2">
                    <button className="rounded bg-blue-500 px-4 py-1 text-white">
                      Wydruk
                    </button>
                  </td>
                  <td className="border-r-2 p-2 text-center">
                    <input
                      type="checkbox"
                      className="h-6 w-6"
                      disabled={index === 0 ? false : !positionState[index - 1]}
                      onChange={(event) => togglePosition(index, event)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default CardTable
