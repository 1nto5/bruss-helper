import express from "express";
const routes = express.Router();

import { save } from "../controllers/extraHours.js";

routes.post("/extrahours/save", save);

export default routes;
