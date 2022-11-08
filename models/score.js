const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scoreSchema = mongoose.Schema({
  victories: { type: Number, default: 0 },
  defeates: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  game_id: { type: Schema.Types.ObjectId, ref: "Game" },
  pangolin_id: { type: Schema.Types.ObjectId, ref: "Pangolin" },
});

module.exports = mongoose.model("Score", scoreSchema);
