import ModelDmc from '../models/dmc.js';

export const countDmc = async (req, res) => {
    try {
        const count = await ModelDmc.countDocuments({ status: req.query.status, article: req.query.article });
        res.json({ message: count });
    } catch (error) {
        return res.json({ message: error });
    }
  }

export const saveDmc = async (req, res) => {
    try {
        const data = req.body;
        const existingData = await ModelDmc.findOne({ dmc: data.dmc });
        if (existingData) return res.json({ message: 'exists' });
        const newDmc = new ModelDmc({ status: 0,  ...data, dmc_time: new Date() });
        await newDmc.save();
        res.json({ message: 'saved' });
    } catch (error) {
        return res.json({ message: error });
    }
};


export const saveHydra = async (req, res) => {
    try {
        const data = req.body;
        const existingData = await ModelDmc.findOne({ workplace: data.workplace, article: data.article, hydra_batch: data.hydra_batch });
        console.log(existingData)
        if (existingData) return res.json({ message: 'exists' });
        await ModelDmc.updateMany(
            { status: 0, article: data.article, workplace: data.workplace }, 
            { $set: { status: 1, hydra_batch: data.hydra_batch, hydra_operator: data.hydra_operator, hydra_time: new Date() } }
        );
        res.json({ message: 'saved' });
    } catch (error) {
        return res.json({ message: error });
    }
  }

  export const savePallet = async (req, res) => {
    try {
        const data = req.body;
        const existingData = await ModelDmc.findOne({ pallet_batch: data.pallet_batch });
        if (existingData) return res.json({ message: 'exists' });
        await ModelDmc.updateMany(
            { status: 1, article: data.article, workplace: data.workplace }, 
            { $set: { status: 2, pallet_batch: data.pallet_batch, pallet_operator: data.pallet_operator, pallet_time: new Date() }}
        );
        res.json({ message: 'saved' });
    } catch (error) {
        return res.json({ message: error });
    }
  }


