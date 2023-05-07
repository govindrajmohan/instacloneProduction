var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
  const {ObjectId} = mongoose.Schema.Types

/**
 * User Schema
 */
var userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "fullname not provided "],
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
    },
  },
 
  password: {
    type: String,
    required: true,
  },

  following:[{type:ObjectId,ref:"User"}],
  followers:[{type:ObjectId,ref:"User"}],
  
  created: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", userSchema);
