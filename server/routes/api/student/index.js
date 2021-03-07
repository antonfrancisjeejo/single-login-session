var express = require("express");
var router = express.Router();

const account = require("./account");
router.use("/account", account);

module.exports = router;
