import express from 'express';
const routes = express.Router();

import { countDmc, saveDmc, saveHydra  } from '../controllers/dmcheckPro.js';

routes.get('/dmcheck-pro/count-dmc', countDmc);
routes.post('/dmcheck-pro/save-dmc', saveDmc);
routes.post('/dmcheck-pro/save-hydra', saveHydra);
routes.post('/dmcheck-pro/save-pallet', saveHydra);

export default routes;