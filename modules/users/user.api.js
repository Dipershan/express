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

//register
router.post("/" ,(req , res , next)=>{
    try {
        res.json({"msg" : "register"})
    } catch (error) {
        next(error);  
    }
} );

//Login
router.post("/:id" , (req ,  res ,  next)=>{
    try {
        const { id }  = req.params.id ;
        res.json({"msg" : "Login User"})
    } catch (error) {
        next(error)
    }
});

//Forget password
router.post("/forget" ,(req , res , next)=>{
    try {
        res.json({"msg" : "forgetin"})
    } catch (error) {
        next(error);
    }
} );


//Change Password
router.post("/change/:id" ,(req , res , next)=>{
    try {
        const { id }  = req.params.id ;
        res.json({"msg" :  `Chage password of id ${id}`})
    } catch (error) {
        next(error);
    }
} );




//Delete
router.delete("/:id" , (req ,  res ,  next)=>{
    try {
        const { id }  = req.params.id ;
        res.json({"msg" : "reset User"})
    } catch (error) {
        next(error)
    }
});

//Verify Tokken
router.post("/verify" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "Token verify"})
    } catch (error) {
        next(error)
    }
});


//Change Status
router.patch("/:id/changeStatus" , (req ,  res ,  next)=>{
    try {
        const { id }  = req.params.id ;
        res.json({"msg" : "Status Changed"})
    } catch (error) {
        next(error)
    }
});

//Update User
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