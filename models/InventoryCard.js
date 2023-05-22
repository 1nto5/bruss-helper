import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema(
  {
    cardNumber: { type: Number, required: true, unique: true },
    warehouse: { type: String, required: true },
    reservedBy: [{ type: String }],
    positions: [
      {
        positionNumber: { type: Number, required: true },
        wip: { type: Boolean, required: true },
        articleNumber: { type: Number, required: true },
        articleName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        inventoryTakers: [{ type: String, required: true }],
        dateTime: { type: Date, default: Date.now },
      },
    ],
  },
  { versionKey: false }
)

const InventoryCard = mongoose.model('Card', cardSchema, 'inventory_cards')
export default InventoryCard
