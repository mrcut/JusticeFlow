const mongoose = require("mongoose");

const SearchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  query: { type: String, required: true },
  results: { type: Array, default: [] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SearchHistory", SearchHistorySchema);
