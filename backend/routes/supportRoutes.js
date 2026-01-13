const express = require("express");
const { sendMessage } = require("../controllers/supportController");

const router = express.Router();

router.post("/", sendMessage);

module.exports = router;
