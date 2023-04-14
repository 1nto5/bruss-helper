import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  cardNumber: { type: Number, required: true, unique: true },
  warehouse: { type: String, required: true },
  reservedBy: [{ type: String }],
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

const InventoryCard = mongoose.model("Card", cardSchema, "inventory_cards");
export default InventoryCard;
