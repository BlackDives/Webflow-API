require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDb = require("./config/db");

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const homeRoute = require("./routes/home");
const comicsRoute = require("./routes/comics");
const authRoute = require("./routes/auth");
const privateRoute = require("./routes/private");
app.use("/home", homeRoute);
app.use("/api", comicsRoute);
app.use("/api/auth", authRoute);
app.use("/api/private", privateRoute);

//connectDB
connectDb();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
