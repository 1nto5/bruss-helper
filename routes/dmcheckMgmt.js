import express from 'express';
const router = express.Router();

import { findDmcs, skipDmc } from '../controllers/dmcheckMgmt.js';

router.get('/dmcheck-mgmt/find', findDmcs);
router.post('/dmcheck-mgmt/skip', skipDmc);

export default router;