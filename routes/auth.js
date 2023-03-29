import express from "express";
import { login, register, fetchMgmtAccess } from "../controllers/auth.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/mgmt-access", fetchMgmtAccess);

export default router;
