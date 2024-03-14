const mongoose = require("mongoose");
exports.Cat = mongoose.model("Cat", { name: String });
