const express = require("express");
const {
  submitUpgradeRequest,
  getAllUpgradeRequests,
  updateRequestStatus,
} = require("../controllers/upgradeController");

const router = express.Router();

// User: Submit an upgrade request
router.post("/submit", submitUpgradeRequest);

// Admin: Get all requests
router.get("/requests", getAllUpgradeRequests);

// Admin: Approve/Reject a request
router.put("/requests/:id", updateRequestStatus);

module.exports = router;