import express from 'express';
const routes = express.Router();

import { registerUser } from '../controllers/registerUser.js';
import { confirmUser } from '../controllers/confirmUser.js';

routes.post('/user/register', registerUser);
routes.get('/user/confirm', confirmUser);

export default routes;