const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendSchema = mongoose.Schema({
  pangolin_id: { type: Schema.Types.ObjectId, ref: "Pangolin" },
  friends_id: [{ type: Schema.Types.ObjectId, ref: "Pangolin" }],
});

module.exports = mongoose.model("Friend", friendSchema);
