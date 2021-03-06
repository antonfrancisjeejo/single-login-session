const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const Student = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    require: [true, "email is required"],
    unique: [true, "User is already registered with this email"],
  },
  password: {
    type: String,
  },
  isActive: Boolean,
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("students", Student);
