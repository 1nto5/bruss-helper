import express from 'express';
import { register, login } from '../controllers/auth.js';

const router = express.Router();

router.post('/auth/register', register);
router.get('/auth/login/:token', login);

export default router;