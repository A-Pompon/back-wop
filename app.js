const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

const pangolinRouter = require("./routes/pangolin");
const scoreRouter = require("./routes/score");
const friendRouter = require("./routes/friends");
const authRouter = require("./routes/auth");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/pangolin", pangolinRouter);
app.use("/api/score", scoreRouter);
app.use("/api/friend", friendRouter);

module.exports = app;
