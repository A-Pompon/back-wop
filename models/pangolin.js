const mongoose = require("mongoose");

const pangolinSchema = mongoose.Schema({
  // Rajouter minlength: 4, maxlength: 16, required: "Password is required for a user!",
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["GUERRIER", "SORCIER", "ESPION", "ALCHIMISTE", "ENCHANTEUR"],
    required: true,
  },
});

module.exports = mongoose.model("Pangolin", pangolinSchema);
