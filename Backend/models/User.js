const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  signInRecords: [
    {
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  signOutRecords: [
    {
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const UserModel = mongoose.model("AGRLARK", UserSchema);

module.exports = UserModel;
