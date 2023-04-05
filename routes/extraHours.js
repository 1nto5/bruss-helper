import express from "express";
const routes = express.Router();

import { save, getUserData } from "../controllers/extraHours.js";

routes.post("/extrahours/save", save);
routes.get("/extrahours/user-data/:userId", getUserData);

export default routes;
