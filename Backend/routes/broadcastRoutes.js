const express = require("express");
const { sendBroadcast, getBroadcasts } = require("../controllers/broadcastController");

const createRouter = (io) => {
  const router = express.Router();

  router.post("/send", (req, res) => sendBroadcast(req, res, io));
  router.get("/", getBroadcasts);

  return router;
};

module.exports = createRouter;
