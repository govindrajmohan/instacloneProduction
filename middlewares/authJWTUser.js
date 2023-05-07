const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require("../model/user.js")

const requireLogin = async (req,res,next)=>{
    try {

        const authHeader = req.headers.authorization;
        // console.log(authHeader)
        if (authHeader) {
          const token = authHeader.split(' ')[1];
          const decoded = jwt.verify(token, process.env.API_SECRET);
          
          const user = await User.findOne({ _id: decoded.id });
          // console.log(user)
          // console.log("Obj id found",user.following,user.followers)
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
}

module.exports = requireLogin;