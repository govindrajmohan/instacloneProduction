var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
/**
 * User Schema
 */
var userDetails = new Schema(
    {
        fullName:String,
        email: {
            type: String,
            unique: true},
        created: {
            type: Date,
            default: Date.now,
          },
        },

        {

            collection :"users",
        }
//   fullName: {
//     type: String,
//     required: [true, "fullname not provided "],
//   },
//   email: {
//     type: String,
//     unique: [true, "email already exists in database!"],
//     lowercase: true,
//     trim: true,
//     required: [true, "email not provided"],
//     validate: {
//       validator: function (v) {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
//       },
//     },
//   },
//   role: {
//     type: String,
//     enum: ["normal", "admin"],
//     required: [true, "Please specify user role"],
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   created: {
//     type: Date,
//     default: Date.now,
//   },
);
module.exports = mongoose.model("UserDetails", userDetails);
