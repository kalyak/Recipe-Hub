const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsSchema = new Schema(
  {
    tagName: { type: String },
    tagType: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Tags = mongoose.model("Tags", TagsSchema);

module.exports = Tags;
