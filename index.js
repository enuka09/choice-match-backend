const express = require("express");
const cors = require("cors");
// eslint-disable-next-line node/no-unpublished-require
const { connectToDatabase } = require("./config/db");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectToDatabase();

app.listen(port, () => {
  console.log(`Server started & running on port ${port}`);
});

app.get("/test-api", (req, res) => {
  return res.json({ message: "Server Works!" });
});
