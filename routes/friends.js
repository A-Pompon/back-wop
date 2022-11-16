const express = require("express");
const router = express.Router();

const friendsCtrl = require("../controllers/friends");

// Read ALL pangolins pour ADMIN
// router.get("/all", friendsCtrl.getAllFriends);

// Read friends
router.get("/", friendsCtrl.getFriends);

// Add by ID pangolins
router.get("/add/:friend_id", friendsCtrl.addFriendById);

// Delete by ID pangolins
router.get("/delete/:friend_id", friendsCtrl.deleteFriendById);

module.exports = router;
