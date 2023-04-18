import Dmc from "../models/dmc.js";

export const countDmc = async (req, res) => {
  try {
    const count = await Dmc.countDocuments({
      status: req.query.status,
      article: req.query.article,
    });
    res.json({ message: count });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const saveDmc = async (req, res) => {
  try {
    const data = req.body;
    const existingData = await Dmc.findOne({ dmc: data.dmc });
    if (existingData) return res.json({ message: "exists" });
    const newDmc = new Dmc({
      status: 0,
      ...data,
      dmc_time: new Date(),
    });
    await newDmc.save();
    res.json({ message: "saved" });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const saveHydra = async (req, res) => {
  try {
    const data = req.body;
    const existingData = await Dmc.findOne({
      workplace: data.workplace,
      article: data.article,
      hydra_batch: data.hydra_batch,
    });
    console.log(existingData);
    if (existingData) return res.json({ message: "exists" });
    await Dmc.updateMany(
      { status: 0, article: data.article, workplace: data.workplace },
      {
        $set: {
          status: 1,
          hydra_batch: data.hydra_batch,
          hydra_operator: data.hydra_operator,
          hydra_time: new Date(),
        },
      }
    );
    res.json({ message: "saved" });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const savePallet = async (req, res) => {
  try {
    const data = req.body;
    const existingData = await Dmc.findOne({
      pallet_batch: data.pallet_batch,
    });

    if (existingData) return res.json({ message: "exists" });
    await Dmc.updateMany(
      { status: 1, article: data.article, workplace: data.workplace },
      {
        $set: {
          status: 2,
          pallet_batch: data.pallet_batch,
          pallet_operator: data.pallet_operator,
          pallet_time: new Date(),
        },
      }
    );
    res.json({ message: "saved" });
  } catch (error) {
    return res.json({ message: error });
  }
};
