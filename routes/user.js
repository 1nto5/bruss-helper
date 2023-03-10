import express from 'express';
const routes = express.Router();

import { registerUser  } from '../controllers/userRegistration.js';

routes.post('/user/register', registerUser);
// routes.post('/user/login', loginUser);s

export default routes;