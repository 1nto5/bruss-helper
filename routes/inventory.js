import express from 'express'
const routes = express.Router()

import {
  reserveCard,
  getCardsByStatus,
  fetchArticlesList,
} from '../controllers/inventory.js'

routes.post('/inventory/reserve-card', reserveCard)
routes.get('/inventory/get-cards-by-status', getCardsByStatus)
routes.get('/inventory/fetch-articles-list', fetchArticlesList)

export default routes
