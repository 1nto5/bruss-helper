import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
  },
  { versionKey: false }
);

const Article = mongoose.model("Article", articleSchema, "inventory_articles");
export default Article;
