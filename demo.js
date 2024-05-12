const { generateToken } = require("./utils/token");

const  router   =  require("express").Router();


router.post("/login" ,  (req , res ,  next ) =>{
    try {
        const {email  , password}  =  req.body;
        if(!email ||  !password) throw Error ("MIssing")
        if(email==="dipsestha321@gmail.com" ||  password ===  1234){
            //generate token
            const payload ={
                email , 
                role :[admin]
            }
            const token  = generateToken(payload);
            res.json({msg:"USer Logged in " , data :token})
        }
        else{
            res.json({msg: "User INvalid"})
        }
    } catch (error) {
        next(error)
    }

})