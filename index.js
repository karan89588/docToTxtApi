const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(cors());

const pdfRoutes = require("./routes/pdfRoute");
const wordRoutes = require("./routes/wordRoute");
const txtRoutes = require("./routes/txtRoute");

app.use("/api/v1/pdf", pdfRoutes);
app.use("/api/v1/word", wordRoutes);
app.use("/api/v1/txt", txtRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

const mongodbUri = process.env.mongodb_uri;

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

app.listen(4000, () => {
  console.log("App is running on PORT 4000");
});
