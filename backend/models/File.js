const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: Buffer, required: true }, // Stockage du fichier sous forme de buffer
  uploadedAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("File", FileSchema);
