const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mainCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainCategory",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
