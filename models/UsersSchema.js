const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isArchived: { type: Boolean, default: false },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }],
    planner: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }],
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
