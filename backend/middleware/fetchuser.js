const jwt = require('jsonwebtoken');
const JWT_Secret = "hellomynameis@akshat"
const fetchuser = (req,res,next) =>{
  //get user from jwt token and add id to req object
  
  const token = req.header('auth-token')
  if(!token){
    return res.status(401).json({error:"Please use valid token to authenticate1"})
  }
  try{
    const data = jwt.verify(token,JWT_Secret)
    req.user = data.user
    next()
  } catch (err) {
    res.status(401).json({error:"Please use valid token to authenticate2"})
  } 
}
module.exports = fetchuser