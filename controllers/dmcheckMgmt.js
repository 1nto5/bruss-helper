import ModelDmc from '../models/dmc.js';

export const findDmcs = async (req, res) => {
  try {
    const workplace = req.query.workplace;
    const article = req.query.article;
    const status = req.query.status;
    const operator = req.query.operator;
    const dmcOrBatch = req.query.dmcOrBatch;
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
    const documents = await ModelDmc
      .find(query)
      .sort({ dmc_time: -1 }) // sort by dmc_time in descending order
      .limit(100) // limit to 100 documents
      .exec();
    res.json(documents);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const skipDmc = async (req, res) => {
  const { selectedDmcs } = req.body;
  try {
    if (!Array.isArray(selectedDmcs)) {
      return res.status(400).send('Invalid request body');
    }
    await ModelDmc.updateMany({ _id: { $in: selectedDmcs.map(dmc => dmc._id) } }, { $set: { status: 9 } });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};
