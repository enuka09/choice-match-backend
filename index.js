const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.SERVER_PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Choice Match!!");
});

app.listen(port, () => {
  console.log(`Server up & running on http://localhost:${port}`);
});
