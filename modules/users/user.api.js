const router =  require("express").Router();
const {generateToken } = require("../../utils/token");
const {secure} = require("../../utils/secure");
const {sendMail} =  require("../../utils/mailer");
const {validator} =  require("./user.validator")
const events = require("events");
const eventEmitter = new events.EventEmitter();


eventEmitter.addListener("signup" , (email)=>
    sendMail({
        email,
        subject:"MOviePlex SignUp",
        htmlMsg:"<b>Thanku for joining Movie Plex</b>"
    })
)


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
    if(!email || !password) throw new Error ("Error or password is missing");
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

router.post("/register" , validator() ,  async(req ,  res , next)=>{
    try {
        const {email } = req.body;
        if(!email) throw Error ("Email  missing");

        //call the nodemailer
       
        eventEmitter.emit("signup" , email);
        
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