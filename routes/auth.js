import express from "express";
import { login, loginToken } from "../controllers/auth.js";

const router = express.Router();

// router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/login/:loginToken", loginToken);

export default router;
