const JWT  = require("jsonwebtoken");


const generateToken = (payload) => 
    JWT.sign(
      {
       
        data:payload,
      },
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_DURATION}
      );



const verifyToken = (token) =>JWT.verify(token ,  process.env.JWT_SECRET);

const checkRole =  ({sysRole ,  userRole}) =>
  userRole.some((role) => sysRole.includes(role));


module.exports = {checkRole , generateToken ,verifyToken }