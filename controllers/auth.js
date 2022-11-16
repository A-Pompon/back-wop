const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtTokens = require("../utils/jwt-helpers");
const utilLogin = require("../utils/util-login");
const Pangolin = require("../models/pangolin");
const Score = require("../models/score");
const Friend = require("../models/friends");
const pangolin = require("../models/pangolin");
const { findOne } = require("../models/pangolin");

// POST - Register user
exports.registerUser = async (req, res) => {
  try {
    if (!utilLogin.validateEmail(req.body.email))
      throw new Error("Email invalide.");
    const email = req.body.email;
    const doesEmailExist = await pangolin.findOne({ email });
    if (doesEmailExist) {
      throw new Error("Email déjà utilisé.");
    }
    if (!utilLogin.validePassword(req.body.password))
      throw new Error("Mot de passe invalide.");
    if (!utilLogin.valideName(req.body.name)) throw new Error("Nom invalide.");

    const name = req.body.name; //  <= Doit correspondre a la requête dans postman

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role;
    try {
      const pangolin = new Pangolin({
        // ...req.body,
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      });
      console.log(name + "CREATE PANGOLIN");
      pangolin
        .save()
        .then((ret) => {
          const score = new Score({
            game_id: "63641e429f982bebe33f1bd3",
            pangolin_id: ret._id,
          });
          score.save();
          const friends = new Friend({
            pangolin_id: ret.id,
          });
          friends.save();
          console.log("====================================");
          console.log(ret);
          console.log("====================================");
          let tokens = jwtTokens.jwtTokens({
            user_id: pangolin._id,
            user_email: pangolin.email,
          });
          res.json(tokens);
        })

        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    console.log("=================REGISTER===================");
    console.log(pangolin);
    console.log("====================================");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - Login JWT
exports.loginUser = async (req, res) => {
  try {
    if (!utilLogin.validateEmail(req.body.email))
      throw new Error("Email invalide.");
    if (!utilLogin.validePassword(req.body.password))
      throw new Error("Mot de passe invalide.");

    const { email, password } = req.body;
    console.log(req.body);
    const user = await pangolin.findOne({ email });
    if (user === null)
      return res.status(401).json({ error: "Email invalide." });
    // PASSWORD CHECK
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Mot de passe invalide." });
    // JWT
    console.log(user);
    let tokens = jwtTokens.jwtTokens({
      user_id: user._id,
      user_email: user.email,
    });
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// POST - Refresh token
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    if (refreshToken === null)
      return res.status(401).json({ error: "Null refresh token" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens.jwtTokens(user);
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
