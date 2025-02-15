const express = require("express");
const { sendBroadcast, getBroadcasts } = require("../controllers/broadcastController");

const createRouter = (io) => {
  const router = express.Router();

  router.post("/send", (req, res) => {
    console.log("Received body:", req.body);
    console.log("Received files:", req.files);
    sendBroadcast(req, res, io);
  });
  
  router.get("/", getBroadcasts);

  return router;
};

module.exports = createRouter;
