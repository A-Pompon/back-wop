const Friend = require("../models/friends");
const Pangolin = require("../models/pangolin");
const jwt = require("jsonwebtoken");

// Read ALL pangolins
exports.getAllFriends = (req, res, next) => {
  Friend.find()
    .then((friends) => res.status(200).json(friends))
    .catch((error) => res.status(400).json({ error }));
};

// Read by ID pangolins
exports.getFriends = (req, res, next) => {
  const token = req.headers.authorization;
  const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!claims) {
    return res.status(401).send({
      message: "Unauthenticated",
    });
  }
  Friend.findOne({
    pangolin_id: claims.id,
  })
    .populate("friends_id", "name role")
    .then((friend) => {
      res.status(200).json(friend);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Delete by ID pangolin (pour suppression du Pangolin)
exports.deleteFriendByPangolinId = (pangolin_id) => {
  Friend.deleteMany({ pangolin_id: pangolin_id })
    .then(() => {
      console.log("Friends deleted");
    })
    .catch((error) => {
      console.log(error);
      console.log(`Friends ${pangolin_id} not deleted`);
    });
};

// Add friend
exports.addFriendById = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }
    const filter = { pangolin_id: claims.id };

    const addFriendOption = {
      $addToSet: {
        friends_id: req.params.friend_id,
      },
    };
    const updateFriendQuery = Friend.findOneAndUpdate(filter, addFriendOption, {
      new: true,
    });

    updateFriendQuery
      .then((resultQuery) => {
        res.status(200).json(resultQuery);
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  } catch (error) {
    res.status(403).json({
      error: error,
    });
    console.log(error);
  }
};

// Delete friend
exports.deleteFriendById = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!claims) {
      return res.status(401).send({
        message: "Unauthenticated",
      });
    }
    const filter = { pangolin_id: claims.id };

    const deleteFriendOption = {
      $pull: {
        friends_id: req.params.friend_id,
      },
    };
    const updateFriendQuery = Friend.findOneAndUpdate(
      filter,
      deleteFriendOption,
      {
        new: true,
      }
    );

    updateFriendQuery
      .then((resultQuery) => {
        res.status(200).json(resultQuery);
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  } catch (error) {
    res.status(403).json({
      error: error,
    });
    console.log(error);
  }
};
