const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Log to the console
  ],
});

module.exports = logger;
