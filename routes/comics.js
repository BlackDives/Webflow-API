const express = require("express");
const router = express.Router();
const multer = require("multer");

const { getComics, postComics } = require("../controllers/comics");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../../client/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.route("/comics").get(getComics);
router.route("/comics").post(postComics);

module.exports = router;
