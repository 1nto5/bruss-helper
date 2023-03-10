import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
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

const ModelDmc = mongoose.model('Model', Schema, 'dmcheck_pro');

export default ModelDmc;
