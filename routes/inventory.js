import express from 'express'
const routes = express.Router()

import {
  reserveCard,
  getCardsByStatus,
  fetchArticlesList,
  getCard,
  savePosition,
} from '../controllers/inventory.js'

routes.post('/inventory/reserve-card', reserveCard)
routes.get('/inventory/get-cards-by-status', getCardsByStatus)
routes.get('/inventory/fetch-articles-list', fetchArticlesList)
routes.get('/inventory/get-card/:cardNumber', getCard)
routes.post('/inventory/save-position//:cardNumber/positions', savePosition)

export default routes
