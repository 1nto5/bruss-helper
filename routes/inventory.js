import express from 'express'
const routes = express.Router()

import {
  reserveCard,
  getCardsByStatus,
  fetchArticlesList,
  savePosition,
  getPositionOptions,
  getPositionData,
} from '../controllers/inventory.js'

routes.post('/inventory/reserve-card', reserveCard)
routes.get('/inventory/get-cards-by-status', getCardsByStatus)
routes.get('/inventory/fetch-articles-list', fetchArticlesList)
routes.get('/inventory/get-position-options/:cardNumber', getPositionOptions)
routes.get(
  '/inventory/get-position-data/:cardNumber/:positionNumber',
  getPositionData
)
routes.post('/inventory/save-position', savePosition)

export default routes
