import mongoose from 'mongoose'
import Article from './InventoryArticle.js' // Import the Article model/schema

const cardSchema = new mongoose.Schema(
  {
    cardNumber: { type: Number, required: true, unique: true },
    warehouse: { type: String, required: true },
    reservedBy: [{ type: String }],
    positions: [
      {
        positionNumber: { type: Number, unique: true, required: true },
        wip: { type: Boolean, required: true },
        article: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Article',
          required: true,
        }, // Add a reference to the Article schema
        quantity: { type: Number, required: true },
        inventoryTakers: [{ type: String, required: true }],
        dateTime: { type: Date, default: Date.now },
      },
    ],
  },
  { versionKey: false }
)

const InventoryCard = mongoose.model('Card', cardSchema, 'inventory_cards')
export default InventoryCard
