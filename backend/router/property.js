const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authenticateToken = require("../middleware/auth");
const { addProperty, updateProperty, showProperty, deleteProperty, getproparty } = require("../controller/property");

router.post("/property", upload.single("image"), authenticateToken, addProperty);

router.put("/property/:id", upload.single("image"), authenticateToken, updateProperty);

router.get("/property", showProperty);
router.get("/property/:id",authenticateToken,getproparty);

router.delete("/property/:id", authenticateToken,deleteProperty);

module.exports = router;
