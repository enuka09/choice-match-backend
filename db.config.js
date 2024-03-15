const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    const uri = process.env.MONGODB_URI || "";
    await mongoose.connect(uri);
  } catch (error) {
    error("Error connecting to the database:", error);
  }
}

module.exports = connectToDatabase;
