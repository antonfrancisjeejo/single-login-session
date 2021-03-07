var express = require("express");
var router = express.Router();

const student = require("./student");
router.use("/student", student);

module.exports = router;
