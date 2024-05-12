const router =  require("express").Router();
const {generateToken } = require("../../utils/token");
const {secure} = require("../../utils/secure");
const {sendMail} =  require("../../utils/mailer");
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
    if(!email || !password) throw new Error ("Error ot password is missing");
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

router.post("/register" , async(req ,  res , next)=>{
    try {
        const {email } = req.body;
        if(!email) throw Error ("Email or passwor missing");

        //call the nodemailer
        const result = await sendMail({
            email,
            subject :"MOvie Plex SignuP",
            htmlMsg:"<b>Thanku for joing MoviePLex</b>"
        });
        res.json({msg:"User Registered Suceessfully"});

    } catch (error) {
        next(error)
    }
})


router.post("/signup" , (req ,  res)=>{
    try {
        
    } catch (error) {
        next(error)
        
    }
})

module.exports = router;