const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/fetchuser")
const JWT_Secret = "hellomynameis@akshat"
const router = express.Router();
//ROUTER 1: This a /api/auth/createUser endpoint to create a new user
router.post('/createUser', [
  //putting validations and error messages of each field
  body('name', "Enter a valid name").isLength({ min: 3 }),
  body('email', "Enter a valid email").isEmail(),
  body('password', "Enter a valid length password").isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  //if there is an error then return bad reqest
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // try if user successfully created then add user or else catch error and send them
  
  const salt = await bcrypt.genSaltSync(10);
  const hashPass = await bcrypt.hashSync(req.body.password, salt);
// Store hash in your password
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPass
    });
    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data,JWT_Secret)
    res.json({authToken});
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Internal Server Error", detail: err.message });
  }
});

//ROUTER 2: This a /api/auth/login endpoint to authenticate a user
router.post('/login',[
    //putting validations and error messages of each field
  body('email', "Enter a valid email").isEmail(),
  body('password', "Enter a valid length password").exists()
  ],async (req,res)=>{
    const errors = validationResult(req);
    //if there is an error then return bad reqest
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email , password } = req.body
    try{
      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({error:"Invalid email or password"});
      }
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch){
        return res.status(400).json({error:"Invalid email or password"});
      }
      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data,JWT_Secret)
      res.json({authToken});
    }catch(err){
      console.error("Error creating user:", err.message);
      res.status(500).json({ error: "Internal Server Error", detail: err.message });
    }
  })
// ROUTER 3: Get logged-in user details using token
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", detail: err.message });
  }
});

module.exports = router;