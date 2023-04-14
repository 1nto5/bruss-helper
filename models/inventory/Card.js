import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  cardNumber: { type: Number, required: true, unique: true },
  warehouse: { type: String, required: true },
  reservedBy: [{ type: String, required: true }],
  positions: [
    {
      number: { type: Number, required: true },
      article: { type: String, required: true },
      quantity: { type: Number, required: true },
      vip: { type: Boolean, required: true },
      inventoryTakers: [{ type: String, required: true }],
      dateTime: { type: Date, default: Date.now },
    },
  ],
});

const Card = mongoose.model("Card", cardSchema, "inventory_cards");
export default Card;
