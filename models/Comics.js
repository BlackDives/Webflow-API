const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  // postDate: {
  //   type: Date,
  //   default: Date.now,
  // },
  // content: {
  //   type: [String],
  //   required: true,
  // },
  // cover: {
  //   type: String,
  //   required: true,
  // },
});

const Comic = mongoose.model("Comic", comicSchema);

module.exports = Comic;
