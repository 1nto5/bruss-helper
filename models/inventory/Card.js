import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  cardNumber: { type: Number, required: true, unique: true },
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  positions: [
    {
      article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
      weight: Number,
      quantity: Number,
    },
  ],
});

const Card = mongoose.model("Card", cardSchema, "inventory_cards");
export default Card;
