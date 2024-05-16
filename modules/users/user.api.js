const router =  require("express").Router();
const {generateToken } = require("../../utils/token");
const {secure} = require("../../utils/secure");
const {sendMail} =  require("../../utils/mailer");
const {validator} =  require("./user.validator")
const multer = require("multer");
const userController =  require('./user.controller');
// const upload = multer({ dest: 'public/upload' })
const events = require("events");
const eventEmitter = new events.EventEmitter();

eventEmitter.addListener("signup" , (email)=>
    sendMail({
        email,
        subject:"MOviePlex SignUp",
        htmlMsg:"<b>Thanku for joining Movie Plex</b>"
    })
)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      console.log({file} ,Date.now());
     cb(
        null,
         file.fieldname.concat(
            "-", 
            Date.now(),
            "." ,
            file.originalname.split(".")[1] 
          ) //profile-1232.jpg
        );
    },
    //How to limit size 1 mb limit??
  });
  
  const upload = multer({
  storage: storage,
//   limits: { fileSize: 1024 * 1024 } // 1 MB limit
});






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

router.post("/register" , upload.single("profile"),validator ,  async(req ,  res , next)=>{

    try {
        const {email } = req.body;
        if(req.file){
            req.body.profile = req.file.path;
        }
       const result = await  userController.create(req.body);
       

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