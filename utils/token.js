const JWT  = require("jsonwebtoken");


const generateToken = (payload) => 
    jwt.sign(
      {
       
        data:payload,
      },
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_DURATION}
      );



const verifyToken = (token) =>JWT.verify(token ,  process.env.JWT_SECRET);


module.exports = {generateToken ,verifyToken }