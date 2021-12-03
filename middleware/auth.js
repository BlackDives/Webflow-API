const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(`token is ${token}`);
  console.log(" ");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "not authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`Verify token: ${token} with secret ${process.env.JWT_SECRET}`);
    const user = await User.findById(decoded.id);
    console.log(`user.id: ${decoded.id}`);
    console.log(`The decoded: ${decoded}, the user: ${user}`);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "No user found with this ID" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized to access this route" });
  }
};
