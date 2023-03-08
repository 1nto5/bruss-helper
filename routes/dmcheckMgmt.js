import express from 'express';
const routes = express.Router();

import { findDmcs, skip } from '../controllers/dmcheckMgmt.js';

routes.get('/dmcheck-mgmt/find', findDmcs);
routes.post('/dmcheck-mgmt/skip', skip);

export default routes;