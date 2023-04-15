import express from "express";
const routes = express.Router();

import { reserveCard, getCardsByStatus } from "../controllers/inventory.js";

routes.post("/inventory/reserve-card", reserveCard);
routes.get("/inventory/get-cards-by-status", getCardsByStatus);

export default routes;
