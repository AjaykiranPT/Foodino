const express = require("express");
const multer = require("multer");
const {
  submitUpgradeRequest,
  getAllUpgradeRequests,
  updateRequestStatus,
} = require("../controllers/upgradeController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temp storage for proof file

// User: Submit an upgrade request
router.post("/submit", upload.single("proofFile"), submitUpgradeRequest);

// Admin: Get all requests
router.get("/requests", getAllUpgradeRequests);

// Admin: Approve/Reject a request
router.put("/requests/:id", updateRequestStatus);

module.exports = router;
