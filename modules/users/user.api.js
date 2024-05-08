const router =  require("express").Router();
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


router.post("/register" ,(req , res , next)=>{
    try {
        res.json({"msg" : "register"})
    } catch (error) {
        next(error);  
    }
} );

router.post("/login" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "Login User"})
    } catch (error) {
        next(error)
    }
});
router.post("/forget" ,(req , res , next)=>{
    try {
        res.json({"msg" : "forgetin"})
    } catch (error) {
        next(error);
    }
} );
router.delete("/reset" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "reset User"})
    } catch (error) {
        next(error)
    }
});

router.post("/verifyToken" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "Token verify"})
    } catch (error) {
        next(error)
    }
});

router.post("/:id/changeStatus" , (req ,  res ,  next)=>{
    try {
        const { id }  = req.params.id ;
        res.json({"msg" : "Status Changed"})
    } catch (error) {
        next(error)
    }
});


router.patch("/updateUser/:id" ,(req , res , next)=>{
    try {
        const { id }  = req.params.id ;
        res.json({"msg" : "user update"});
    } catch (error) {
        next(error);  
    }
} );


//Update Profile
router.put("/updateProfile/:id" , (req ,  res ,  next)=>{
    try {
        const { id }  = req.params.id ;
        res.json({"msg" : "Profile Updated"})
    } catch (error) {
        next(error)
    }
});


//GetUser
router.patch("/getUser/:id" ,(req , res , next)=>{
    try {
        const { id }  = req.params.id ;
        res.json({"msg" : " get user"})
    } catch (error) {
        next(error);
    }
} );


module.exports =  router;