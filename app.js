import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dmcheckMgmtRoutes from './routes/dmcheckMgmt.js';

const app = express();
app.use(bodyParser.json());

// TODO save time in API, not client

// PRODUCTION
// const PORT = "80"

// DEVELOPMENT
import cors from 'cors';
app.use(cors({
  origin: "*"
}));
const PORT = "4000"

// ROUTES
app.use('/', dmcheckMgmtRoutes);

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://express:VWEsRJtgYvsUTjTQ@dmcheck-mongo.sqcfxa5.mongodb.net/bruss_helper', { useNewUrlParser: true });
// mongoose.connect('mongodb://127.0.0.1/bruss_helper', { useNewUrlParser: true });



app.post('/dmcheck-pro/dmc-save', async (req, res) => {
  try {
    const data = req.body;
    const dmc = data.dmc;
    const Dmc = mongoose.model('Dmc', DmcSchema, 'dmcheck_pro');
    const existingData = await Dmc.findOne({ dmc });
    if (existingData) return res.json({ message: `DMC istnieje w bazie!` });
    const newDmc = new Dmc(data);
    await newDmc.save();
    res.json({ message: 'DMC OK!' });
  } catch (error) {
    return res.json({ message: error });
  }
});

app.post('/dmcheck-pro/hydra-save', async (req, res) => {
  try {
    const data = req.body;
    // const collection = data.collection; // workplace name
    const hydra_batch = data.hydra_batch;
    const hydra_operator = data.hydra_operator;
    const hydra_time = data.hydra_time;
    const article = data.article;
    const workplace = data.workplace;
    const Dmc = mongoose.model('Dmc', DmcSchema, 'dmcheck_pro');
    const result = await Dmc.findOne({ hydra_batch: hydra_batch, article: article });
    if (result) return res.json({ message: "Batch istnieje w bazie!" });
    await Dmc.updateMany({ status: 0, article: article, workplace: workplace }, { $set: { status: 1, hydra_batch, hydra_operator, hydra_time } });
    res.json({ message: "Karta HYDRA zapisana!" });
  } catch (error) {
    return res.json({ message: error });
  }
});

app.post('/dmcheck-pro/pallet-save', async (req, res) => {
  try {
    const data = req.body;
    // const collection = data.collection; // workplace name
    const pallet_batch = data.pallet_batch;
    const pallet_operator = data.pallet_operator;
    const pallet_time = data.pallet_time;
    const workplace = data.workplace;
    const article = data.article;
    const Dmc = mongoose.model('Dmc', DmcSchema, 'dmcheck_pro');
    const result = await Dmc.findOne({ pallet_batch: pallet_batch, article: article });
    if (result) return res.json({ message: "Batch istnieje w bazie!" });
    await Dmc.updateMany({ status: 1, article: article, workplace: workplace }, { $set: { status: 2, pallet_batch, pallet_operator, pallet_time } });
    res.json({ message: "Karta PALETA zapisana!" });
  } catch (error) {
    return res.json({ message: error });
  }
});

app.get('/dmcheck-pro/count', async (req, res) => {
  try {
    // const collection = req.query.collection; // workplace name
    const article = req.query.article
    const status = req.query.status; // 0 / 1 / 2
    const Dmc = mongoose.model('Dmc', DmcSchema, 'dmcheck_pro');
    const count = await Dmc.countDocuments({ status: status, article: article });
    res.json({ message: count });
  } catch (error) {
    return res.json({ message: error });
  }
});

// PRODUCTION
// import path from 'path';
// import serveStatic from 'serve-static';
// app.use(serveStatic(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
