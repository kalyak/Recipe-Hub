const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isArchived: { type: Boolean, default: false },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }],
    planner: [
      {
        multiplier: { type: Number },
        ingredientList: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Recipes",
          // populate ingredientLists Array from recipe schema, and populate ingredientName from ingredients schema
        },
      },
    ],
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;

// sample planner
// planner: [
//   {
//     multiplier: 2,
//     ingredientList: [
//       { quantity: 3, unit: "gram", ingredientName: "tomatoes" },
//       { quantity: 4, unit: "none", ingredientName: "eggs" },
//     ],
//   },

//   {
//     multiplier: 5,
//     ingredientList: [
//       { quantity: 1, unit: "packs", ingredientName: "instant noodle" },
//       { quantity: 1, unit: "none", ingredientName: "eggs" },
//     ],
//   },
// ];
