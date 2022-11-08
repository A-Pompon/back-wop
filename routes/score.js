const express = require("express");
const router = express.Router();

const scoreCtrl = require("../controllers/score");

// Read ALL scores
router.get("/", scoreCtrl.getAllScores);

// ShiFuMi Victories
router.get("/victories", scoreCtrl.shifumiVictories);

// ShiFuMi Defeates
router.get("/defeates", scoreCtrl.shifumiDefeates);

// ShiFuMi Level 3 Win 3
router.get("/win1", scoreCtrl.winLevelOne);

// ShiFuMi Level 3 Loose -3
router.get("/loose1", scoreCtrl.looseLevelOne);

// ShiFuMi Level 3 Win 5
router.get("/win2", scoreCtrl.winLevelTwo);

// ShiFuMi Level 3 Loose -5
router.get("/loose2", scoreCtrl.looseLevelTwo);

// ShiFuMi Level 3 Win 7
router.get("/win3", scoreCtrl.winLevelThree);

// ShiFuMi Level 3 Loose -7
router.get("/loose3", scoreCtrl.looseLevelThree);

module.exports = router;
