const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("req home");
  res.send("this works");
});

module.exports = router;
