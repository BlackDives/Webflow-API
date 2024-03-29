const User = require("../models/Users");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(`starting response ${res}`);

  try {
    console.log(req.body);
    console.log("trying to create user");
    console.log(
      `Data is username: ${username}, email: ${email}, and password: ${password}`
    );
    const user = await User.create({
      username,
      email,
      password,
    });

    // res.status(201).json({ success: true, user });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(`the res is ${req.body.email}`);

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "Please provide email and password" });
  }

  try {
    console.log(req.body);
    console.log(`Data is email: ${email}, and password: ${password}`);
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res
        .status(404)
        .json({ success: false, error: "No account exists with that email" });
    }

    const isMatch = user.password === password ? true : false;
    if (!isMatch) {
      res.status(404).json({ success: false, error: "Password is incorrect" });
    }
    console.log(`the body right before it is sent ${res.body}`);
    console.log(`the req.body ${req.body}`);
    // res.status(200).json({ success: true, token: "3hf74f" });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Email could not be sent" });
    }

    const resetToken = user.getResetToken();
    await user.save();

    const resetUrl = `http://localhost:3000/passwordrest/${resetToken}`;
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
    } catch (error) {}
  } catch (error) {}
};
exports.resetPassword = (req, res, next) => {
  res.send("Reset password Route");
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSomeToken();
  res.status(statusCode).json({ success: true, token });
};
