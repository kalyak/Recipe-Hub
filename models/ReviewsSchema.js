const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    rating: { type: Number },
    review: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Reviews = mongoose.model("Reviews", ReviewsSchema);

module.exports = Reviews;
