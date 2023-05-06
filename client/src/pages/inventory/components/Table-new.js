import React, { useState, useContext, useEffect, useMemo } from 'react'
import Select from 'react-select'
import { Context } from '../Context'
import useArticles from '../hooks/useArticles'
import useCard from '../hooks/useCard'

const CardTable = () => {
  // Get values from context
  const { cardNumber, warehouse, inventoryTaker1, inventoryTaker2 } =
    useContext(Context)

  // Get card data
  const {
    data: card,
    isLoading: cardLoading,
    error: cardError,
  } = useCard(cardNumber)

  // Get articles list
  const {
    data: articles,
    isLoading: articlesLoading,
    error: articlesError,
  } = useArticles()

  // Create options for the articles select input
  const articleSelectOptions = useMemo(() => {
    if (!articlesLoading) {
      return articles.map((article) => ({
        value: article.number,
        label: `${article.number} - ${article.name}`,
      }))
    }
  }, [articles, articlesLoading])

  // Check if the card has positions or not
  const hasPositions = card && card.positions && card.positions.length > 0

  // Prepare rows to display
  const rows = hasPositions
    ? card.positions.concat(
        Array.from({ length: 25 - card.positions.length }, () => ({}))
      )
    : Array.from({ length: 25 }, () => ({}))

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
              <tr className="border-gray-200 text-center">
                <td className="border-r-2 p-2 text-center">
                  <input type="checkbox" className="h-6 w-6" />
                </td>
                <td className="max-w-[20px] border-r-2 p-2"></td>
                <td className="border-r-2 p-2 px-8 ">
                  {articlesLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <Select
                      options={articleSelectOptions}
                      className="text-left"
                      placeholder="wybierz"
                      menuPortalTarget={document.body}
                    />
                  )}
                </td>
                <td className="border-r-2 p-2">
                  <div className="flex items-center justify-center">
                    <input
                      type="number"
                      className="w-full max-w-[150px] rounded border p-2 text-right"
                      placeholder=""
                    />
                  </div>
                </td>
                <td className="p-2">
                  <button className="rounded bg-blue-500 px-4 py-1 text-white">
                    Wydruk
                  </button>
                </td>
                <td className="border-r-2 p-2 text-center">
                  <input type="checkbox" className="h-6 w-6" />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default CardTable
