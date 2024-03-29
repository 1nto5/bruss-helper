import express from "express";
import {
  login,
  register,
  fetchMgmtAccess,
  isTokenValid,
  getUsernameFromToken,
  getUserIdFromToken,
  getExtraHoursSupervisors,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/is-token-valid", isTokenValid);
router.get("/auth/mgmt-access", fetchMgmtAccess);
router.get("/auth/extract-username", getUsernameFromToken);
router.get("/auth/extract-userid", getUserIdFromToken);
router.get("/auth/extrahours-supervisors", getExtraHoursSupervisors);

export default router;
