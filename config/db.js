const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.CONNECTION);

  console.log("mongodb connected");
};

module.exports = connectDb;
