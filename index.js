const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db.config");
const bodyParser = require("body-parser");
const logger = require("./src/utils/logger");
const authJwt = require("./src/middleware/authJwt");
const errorHandler = require("./src/middleware/errorHandler");
require("dotenv").config();

const api = process.env.API_URL;

const app = express();
app.use(cors());
app.options("*", cors);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authJwt());
app.use(errorHandler);

const userRoute = require("./src/routes/userRoutes");
const productRoute = require("./src/routes/productRoute");
const mainCategoryRoute = require("./src/routes/mainCategoryRoutes");
const subCategoryRoute = require("./src/routes/subCategoryRoutes");
const brandRoute = require("./src/routes/brandRoutes");
const orderRoute = require("./src/routes/orderRoutes");

app.use(`${api}/users`, userRoute);
app.use(`${api}/products`, productRoute);
app.use(`${api}/main-categories`, mainCategoryRoute);
app.use(`${api}/sub-categories`, subCategoryRoute);
app.use(`${api}/brands`, brandRoute);
app.use(`${api}/orders`, orderRoute);

app.get(`${api}/test-api`, (req, res) => {
  res.send("Server Works!");
});

const server = app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server started & running on port ${server.address().port}`);
});

connectToDatabase();

module.exports = server;
