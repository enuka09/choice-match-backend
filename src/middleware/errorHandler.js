// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err.name == "UnauthorizedError") {
    // JWT Authentication Error
    return res.status(401).json({ message: "User is not Authorized!" });
  }

  if (err.name == "ValidationError") {
    // Validation Error
    return res.status(401).json({ message: err });
  }

  // Default to 500 Internal Server Error
  return res.status(500).json(err);
}

module.exports = errorHandler;
