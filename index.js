require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const homeRoute = require("./routes/home");
const comicsRoute = require("./routes/comics");
const authRoute = require("./routes/auth");
const privateRoute = require("./routes/private");
const connectDb = require("./config/db");

const app = express();
app.use(express.json());
app.use("/home", homeRoute);
app.use("/comics", comicsRoute);
app.use("/api/auth", authRoute);
app.use("/api/private", privateRoute);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//connectDB
connectDb();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
