const router =  require("express").Router();
const {generateToken } = require("../../utils/token");
const {secure} = require("../../utils/secure");
const {validator} =  require("./user.validator")
const multer = require("multer");
const userController =  require('./user.controller');
// const upload = multer({ dest: 'public/upload' })




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



router.post("/register" , upload.single("profile"),validator ,  async(req ,  res , next)=>{

    try {
        
        if(req.file){
            req.body.profile = req.file.path;
        }
       const result = await  userController.create(req.body);
       

        
        res.json({msg:"User Registered Suceessfully"});

    } catch (error) {
        next(error)
    }
});




router.get("/" ,secure(["admin"]) , (req ,  res ,  next)=>{
    try {
        res.json({msg:"User list generated" , data:[]})
    } catch (error) {
        next(error);
    }
})


router.post("/login"  , async(req , res , next)=>{
    try {
        const result  = await userController.login(req.body);
        res.json({msg:"user logged in sucessfully " , data:result})
                    
    } catch (error) {
        next(error)
    }
});


router.post("/generate-email-token"  , async(req , res , next)=>{
    try {
        const result  = await userController.generateEmailToken(req.body);
        res.json({msg:"EMail token generated sucessfully " , data:result})
                    
    } catch (error) {
        next(error)
    }
});


router.post("/verify-email-token" ,  async(req ,  res ,  next)=>
{
    try
     {
        const result  =  await userController.verifyEmailToken(req.body);
        res.json({msg:"Email Sucessfully logged in " ,  data: result});
     } 
    catch (error) 
    {
        next(error);
    };
});
   

    router.patch("/:id/block" ,  async(req , res, next)=>{
        try {
            
        } catch (error) {
            next(error)
        }

    });

    
    router.delete("/:id" ,  async(req , res, next)=>{
        try {
            
        } catch (error) {
            next(error)
        }

    });

    
    router.get("/profile" ,  async(req , res, next)=>{
        try {
            
        } catch (error) {
            next(error)
        }

    })

    
    router.put("/profile" ,  async(req , res, next)=>{
        try {
            
        } catch (error) {
            next(error)
        }

    })


    
    router.get("/:id" ,  async(req , res, next)=>{
        try {
            
        } catch (error) {
            next(error)
        }

    });

    
    router.post("/change-passowrd" ,  async(req , res, next)=>{
        try {
            
        } catch (error) {
            next(error)
        }

    });

    
    router.post("/reset-password" ,  async(req , res, next)=>{
        try {
            
        } catch (error) {
            next(error)
        }

    })

    
    router.post("/forget-passoword" ,  async(req , res, next)=>{
        try {
            
        } catch (error) {
            next(error)
        }

    })




module.exports = router;