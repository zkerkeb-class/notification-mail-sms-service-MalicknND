const express = require("express");
const router = express.Router();
const { sendMailHandler } = require("../controllers/notification.controller");

router.post("/mail", sendMailHandler);

module.exports = router;
