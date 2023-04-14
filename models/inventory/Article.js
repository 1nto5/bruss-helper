import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true, enum: ["weight", "quantity"] },
  conversionRate: { type: Number, required: true },
});

const Article = mongoose.model("Article", articleSchema, "inventory_articles");
export default Article;
