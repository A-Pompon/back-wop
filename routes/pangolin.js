const express = require("express");
const router = express.Router();

const pangolinCtrl = require("../controllers/pangolin");

// Pour Admin

// Read ALL pangolins
// router.get("/", pangolinCtrl.getAllPangolins);

// Create pangolin
// router.post("/", pangolinCtrl.createPangolin);

// Read by ID pangolins
// router.get("/:id", pangolinCtrl.getPangolinById);

// Update by ID pangolin
// router.put("/:id", pangolinCtrl.modifyPangolin);

// Delete by ID pangolin
// router.delete("/:id", pangolinCtrl.deletePangolin);

module.exports = router;
