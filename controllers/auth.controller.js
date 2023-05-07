var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../model/user");
const {API_SECRET} = require('..//config/keys')

exports.signup = async ( req, res,next)=> {

  try{
    
      const user = new User({
          fullName: req.body.fullName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        });

        

    const userFindInDb = await User.findOne({ email: req.body.email });
        if(userFindInDb){
          return res.status(404).json({message:"User registered aleady"})

        }
        await user.save();
        

        res.status(201).send({
          message: "User Registered successfully"
          })
          }

  catch(err){
      next("Signup error",err);
  }
}; 

exports.signin = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      const passwordIsValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).json({ accessToken: null, message: "Invalid password." });
      }
      const token = jwt.sign({ id: user.id,test:'data' }, process.env.API_SECRET);
      res.status(200).json({
        user: {
          id: user._id,
          email: user.email,
        },
        message: "Login successful.",
        accessToken: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

