const jwt = require("jsonwebtoken");
const User = require("../model/user");
const {API_SECRET} =require('../config/keys')

const verifyToken = async (req, res, next) => {

  
  // console.log('token',req.headers.authorization)
  try {

    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.API_SECRET);
      // console.log(decoded)
      const user = await User.findOne({ _id: decoded.id });
      // console.log("Obj id found",user._id)
      if (user) {
        req.user = user;
        next();
      } else {
        throw new Error('User not found');
      }
    } else {
      throw new Error('Authorization header not found');
    }
  } catch (err) {
    console.log(err)
    req.user = undefined;
    res.status(401).json({ message: 'Unauthorized Token',err});
  }

};

module.exports = verifyToken;


