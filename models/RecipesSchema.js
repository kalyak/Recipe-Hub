const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipesSchema = new Schema(
  {
    recipeName: { type: String },
    servingSize: { type: Number },
    prepTime: { type: Number },
    cookTime: { type: Number },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
    description: { type: String },
    ingredientList: [
      {
        quantity: { type: Number },
        units: { type: String },
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredients",
        },
      },
    ],
    instructions: { type: Array },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    rating: { type: Number },
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Recipes = mongoose.model("Recipes", RecipesSchema);

module.exports = Recipes;
