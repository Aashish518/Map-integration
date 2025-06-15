const express = require("express");
const router = express.Router();
const { login } = require("../controller/user");

router.post("/user",login);

module.exports = router;