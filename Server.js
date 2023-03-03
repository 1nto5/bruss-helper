const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();
app.use(bodyParser.json());

// DEVELOPMENT
// const cors = require("cors");
// app.use(cors({
//   origin: "*"
// }));
// const PORT = "4000"

// PRODUCTION
const PORT = "80"

const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

// Connect to MongoDB
// mongoose.connect('mongodb+srv://express:VWEsRJtgYvsUTjTQ@dmcheck-mongo.sqcfxa5.mongodb.net/bruss-helper', { useNewUrlParser: true });
mongoose.connect('mongodb://127.0.0.1/bruss_helper', { useNewUrlParser: true });

const DmcSchema = new mongoose.Schema({
  status: Number,
  workplace: String,
  article: String,
  dmc: String,
  dmc_operator: String,
  dmc_time: Date,
  hydra_batch: String,
  hydra_operator: String,
  hydra_time: Date,
  pallet_batch: String,
  pallet_operator: String,
  pallet_time: Date,
  skip_user: String,
  skip_time: Date,
  skip_reason: String
}, { versionKey: false });

app.get('/dmcheck-mgmt-find', async (req, res) => {
  try {
    // const collection = req.query.workplace;
    const workplace = req.query.workplace;
    const article = req.query.article;
    const status = req.query.status;
    const operator = req.query.operator;
    const dmcOrBatch = req.query.dmcOrBatch;
    const Dmc = mongoose.model('Dmc', DmcSchema, 'dmcheck_pro');
    let query = {};
    if (workplace) {
      query.workplace = workplace;
    }
    if (article) {
      query.article = article;
    }
    if (status) {
      query.status = status;
    }
    if (operator) {
      query.$or = [
        { dmc_operator: operator },
        { hydra_operator: operator },
        { pallet_operator: operator }
      ];
    }
    if (dmcOrBatch) {
      const regex = new RegExp(`.*${dmcOrBatch}.*`, "i");
      query.$or = [
        { dmc: { $regex: regex } },
        { hydra_batch: { $regex: regex } },
        { pallet_batch: { $regex: regex } }
      ];
    }
    if (req.query.start) {
      const start = new Date(req.query.start);
      query.dmc_time = { $gte: start };
    }
    if (req.query.end) {
      const end = new Date(req.query.end);
      if (query.dmc_time) {
        query.dmc_time.$lte = end;
      } else {
        query.dmc_time = { $lte: end };
      }
    }
    const documents = await Dmc
      .find(query)
      .sort({ dmc_time: -1 }) // sort by dmc_time in ascending order
      .limit(100) // limit to 100 documents
      .exec();
    res.json(documents);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/dmcheck-mgmt-skip', async (req, res) => {
  const { selectedDmcs, collection } = req.body;
  try {
    const Dmc = mongoose.model('Dmc', DmcSchema, 'dmcheck_pro');
    if (!Array.isArray(selectedDmcs)) {
      return res.status(400).send('Invalid request body');
    }
    await Dmc.updateMany({ _id: { $in: selectedDmcs.map(dmc => dmc._id) } }, { $set: { status: 9 } });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

app.post('/dmcheck-pro-dmc-save', async (req, res) => {
  try {
    const data = req.body;
    // const collection = data.collection; // workplace name
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

app.post('/dmcheck-pro-hydra-save', async (req, res) => {
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

app.post('/dmcheck-pro-pallet-save', async (req, res) => {
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

app.get('/dmcheck-pro-count', async (req, res) => {
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
// Serve the static files from the React app
app.use(serveStatic(path.join(__dirname, 'react/build')));

// Handles any requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'react/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
