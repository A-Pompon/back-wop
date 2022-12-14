const Pangolin = require("../models/pangolin");
const Score = require("../models/score");
const Friend = require("../models/friends");
const jwt = require("jsonwebtoken");

// Read ALL scores
exports.getAllScores = (req, res, next) => {
  Score.find({})
    .sort({ points: -1 })
    .populate("pangolin_id", "name role")
    .then((scores) => res.status(200).json(scores))
    .catch((error) => res.status(400).json({ error }));
};

// Read user Score
exports.getMyScoreById = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    Score.findOne({ pangolin_id: claims.id })
      .populate("pangolin_id", "name role")
      .then((score) => {
        res.status(200).json(score);
      })

      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Unauthenticated err",
    });
  }
};

// Read ID Score
exports.getScoreById = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    Score.findById(req.params.id)
      .populate("pangolin_id", "name role")
      .then((score) => {
        Friend.findOne({ pangolin_id: claims.id })
          .populate("friends_id", "name role")
          .then((friends) => {
            let scoreWithFriends = score.toObject();
            scoreWithFriends["friends"] =
              friends.toObject().friends_id == null
                ? []
                : friends.toObject().friends_id;

            res.status(200).json(scoreWithFriends);
          });
      })

      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    return res.status(401).send({
      message: "Unauthenticated err",
    });
  }
};

// Delete Score By ID (pour supression du Pangoin)
exports.deleteScoreByPangolinId = () => {
  console.log("DELETE SCORE FONCTION");
  Score.deleteMany({ pangolin_id: pangolin_id })
    .then(() => {
      console.log("OK DELETE SCORE");
    })
    .catch((error) => {
      console.log(error);
    });
};

// ShiFuMi VICTORY
exports.shifumiVictories = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const updatedVictories = await Score.findOneAndUpdate(
      {
        pangolin_id: claims.id,
      },
      { $inc: { victories: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedVictories);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Unauthenticated err",
    });
  }
};

// ShiFuMi DEFEATE
exports.shifumiDefeates = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const updatedDefeates = await Score.findOneAndUpdate(
      {
        pangolin_id: claims.id,
      },
      { $inc: { defeates: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedDefeates);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Unauthenticated err",
    });
  }
};

// ShiFuMi Level 1 Win +3
exports.winLevelOne = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const updatedScore = await Score.findOneAndUpdate(
      {
        pangolin_id: claims.id,
      },
      { $inc: { points: 3 } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedScore);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Unauthenticated err",
    });
  }
};

// ShiFuMi Level 1 Loose -3
exports.looseLevelOne = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const updatedScore = await Score.findOneAndUpdate(
      {
        pangolin_id: claims.id,
      },
      { $inc: { points: -3 } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedScore);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Unauthenticated err",
    });
  }
};

// ShiFuMi Level 2 Win -5
exports.winLevelTwo = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const updatedScore = await Score.findOneAndUpdate(
      {
        pangolin_id: claims.id,
      },
      { $inc: { points: 5 } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedScore);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Unauthenticated err",
    });
  }
};

// ShiFuMi Level 2 Loose -5
exports.looseLevelTwo = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const updatedScore = await Score.findOneAndUpdate(
      {
        pangolin_id: claims.id,
      },
      { $inc: { points: -5 } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedScore);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Unauthenticated err",
    });
  }
};

// ShiFuMi Level 3 Win +7
exports.winLevelThree = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const updatedScore = await Score.findOneAndUpdate(
      {
        pangolin_id: claims.id,
      },
      { $inc: { points: 7 } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedScore);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Unauthenticated err",
    });
  }
};

// ShiFuMi Level 3 Loose -7
exports.looseLevelThree = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }

    const updatedScore = await Score.findOneAndUpdate(
      {
        pangolin_id: claims.id,
      },
      { $inc: { points: -7 } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedScore);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Unauthenticated err",
    });
  }
};
