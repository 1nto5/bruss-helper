import express from "express";
const routes = express.Router();

import { inUse, reserveCard } from "../controllers/inventory.js";

routes.post("/inventory/reserve-card", reserveCard);
routes.get("/inventory/cards-in-use", inUse);

export default routes;
