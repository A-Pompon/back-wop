const Pangolin = require("../models/pangolin");
const Score = require("../models/score");
const Friend = require("../models/friends");

const jwt = require("jsonwebtoken");

const scoreCtrl = require("../controllers/score");
const friendCtrl = require("../controllers/friends");

// Update Name & Role
exports.updateName = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const updateProfile = await Pangolin.findByIdAndUpdate(
      claims.id,
      { $set: { name: req.body.name, role: req.body.role } },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log("====================================");
    console.log(updateProfile);
    console.log("====================================");
    res.send(updateProfile);
  } catch (error) {
    res.status(400).json({ error });
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

// Read ALL Score pangolins
exports.getAllPangolins = (req, res, next) => {
  Pangolin.find()
    .then((pangolins) => res.status(200).json(pangolins))
    .catch((error) => res.status(400).json({ error }));
};

// Create pangolin
exports.createPangolin = (name, email, password, role) => {
  // delete req.body._id;
  const pangolin = new Pangolin({
    // ...req.body,
    name: name,
    email: email,
    password: password,
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
      return ret;
    })
    .catch((error) => {
      throw error;
    });
};

// Read ME
exports.getProfil = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("==================TOKEN==================");
    console.log(token);
    console.log("====================================");
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }
    Pangolin.findById(claims.id)
      .then((pangolin) => {
        res.status(200).json(pangolin);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  } catch (error) {
    console.log("=================403===================");
    console.log(error);
    console.log("====================================");
    res.status(403).json({
      error: error,
    });
  }
};

// Read by ID pangolins
exports.getPangolinById = (req, res, next) => {
  Pangolin.findOne({
    _id: req.params.id,
  })
    .then((pangolin) => {
      res.status(200).json(pangolin);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Update by ID pangolin
exports.modifyPangolin = (req, res, next) => {
  const pangolin = new Pangolin({
    _id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  console.log(req.body.name + "UPDATE PANGOLIN");
  Pangolin.updateOne({ _id: req.params.id }, pangolin)
    .then(() => {
      res.status(201).json({
        message: "Pangolin updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Delete by ID pangolin
exports.deletePangolin = (req, res, next) => {
  Pangolin.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("DANS LE THEN");
      scoreCtrl.deleteScoreByPangolinId(req.params.id);
      friendCtrl.deleteFriendByPangolinId(req.params.id);
      res.status(200).json({
        message: "Pangolin deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
