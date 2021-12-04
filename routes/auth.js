const express = require("express");
const router = express.Router();
const bp = require("body-parser");

const jsonParse = bp.json();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getUsers,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(jsonParse, login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);
router.route("/users").get(getUsers);

module.exports = router;
