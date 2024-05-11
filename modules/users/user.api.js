const router =  require("express").Router();
const {generateToken } = require("../../utils/token");
const {secure} = require("../../utils/secure")
/**
 * Register
 * Login
 * forget
 * reset
 * change
 * verify token
 * change status
 * delete user
 * list users
 * update user
 * update my profile
 * get one user
 */

router.get("/" ,secure(["admin"]) , (req ,  res ,  next)=>{
    try {
        res.json({msg:"User list generated" , data:[]})
    } catch (error) {
        next(error);
    }
})


router.post("/login"  , (req , res , next)=>{
    try {
    const {email ,  password} =  req.body;
        if(email === "dipsestha321@gmail.com" || password === 1234 ){
            //generate the token
            const payload = {
                email ,  
                role: ["admin"],
            };
            const token = generateToken(payload);
            res.json({msg : "User logged in" ,  data:token})

        }
        else{
            res.json({msg:"EMail or password invalid"});
        }
                    
    } catch (error) {
        next(error)
    }
})

module.exports = router;