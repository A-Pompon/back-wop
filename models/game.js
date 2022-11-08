const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  nameGame: { type: String, required: true },
});

module.exports = mongoose.model("Game", gameSchema);
