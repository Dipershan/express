const JWT  = require("jsonwebtoken");
const Crypto =  require("crypto")


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

const generateOtp =  () =>{
  return Crypto.randomInt(100000 , 990999)
};

console.log(generateOtp());

module.exports = {checkRole , generateToken ,verifyToken , generateOtp }