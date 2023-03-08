import express from 'express';
const routes = express.Router();

import { findDmcs } from '../controllers/dmcheckMgmt.js';

routes.get('/dmcheck-mgmt/find', findDmcs);

export default routes;