const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema(
  {
    username: { type: String },
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
