var express = require("express"),
  router = express.Router(),
  requireLogin = require("../middlewares/authJWTUser"),
  { signup, signin } = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

var cors = require("cors");
router.use(cors());
router.use(express.json());
router.get("/", function (req, res) {
  res.send("Successfully connected to server");

});

router.post("/register", signup,function (req, res) {
 
});
router.post("/login", signin, function (req, res) {});

router.get("/following", requireLogin, async (req, res, next)=> {
  try {
    const data = await User.findById({ _id:req.user.id }).populate("following");
    if (!data) {
      return res.status(404).json({ message: "User not found." });
    }
   
    res.status(200).json({
      user: {
        // id: data._id,
        // email: data.email,
        // fullName: data.fullName,
        // followers:data.followers,
        following:data.following,
      },
      // Data:data,
      message: "Following get successful.",
   
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
})

router.get("/followers", requireLogin, async (req, res, next)=> {
  try {
    const data = await User.findById({ _id:req.user.id }).populate("followers");
    if (!data) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      user: {
        followers:data.followers,
        // id: data._id,
        // email: data.email,
        // fullName: data.fullName,
        // following:data.following,
      },
      // Data:data,
      message: "Followers get successful.",
   
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
})


router.put("/follow", requireLogin, async (req, res, next)=> {

  try {
    const followId = req.body.followId;
  const user = await User.findOneAndUpdate(
    { _id: followId },
    { $addToSet: { followers: req.user.id } },
    { new: true }
  );
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { $addToSet: { following: followId } },
    { new: true }
  );
    res.json(user);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }

});

router.put("/unfollow", requireLogin, async (req, res, next)=> {

  try {
    const followId = req.body.followId;
  const user = await User.findOneAndUpdate(
    { _id: followId },
    { $pull: { followers: req.user.id } },
    { new: true }
  );
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { $pull: { following: followId } },
    { new: true }
  );
    res.json(user);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }

});

router.put("/removefollowers", requireLogin, async (req, res, next)=> {

  try {
    const followId = req.body.followId;
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $pull: { followers: followId } },
    { new: true }
  );
  await User.findOneAndUpdate(
    { _id: followId },
    { $pull: { following: req.user.id } },
    { new: true }
  );
    res.json(user);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }

});


router.post("/userdetails", async (req, res, next) => {
  try {
    const userDetails = await User.find({email: { $ne: req.body.email }});
   
    res.send({ status: "Ok", data: userDetails });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
