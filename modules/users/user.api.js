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


router.post("/api/v1/register" ,(req , res , next)=>{
    try {
        res.json({"msg" : "register"})
    } catch (error) {
        next(error);  
    }
} );

router.post("/api/v1/login" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "Login User"})
    } catch (error) {
        next(error)
    }
});
router.post("/api/v1/forget" ,(req , res , next)=>{
    try {
        res.json({"msg" : "forgetin"})
    } catch (error) {
        next(error);
    }
} );

router.post("/api/v1/verifyToken" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "Token verify"})
    } catch (error) {
        next(error)
    }
});

router.patch("/api/v1/updateUser" ,(req , res , next)=>{
    try {
        res.json({"msg" : "user update"})
    } catch (error) {
        next(error);  
    }
} );

router.put("/api/v1/updateProfile" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "Profile Updated"})
    } catch (error) {
        next(error)
    }
});

router.patch("/api/v1/getUser" ,(req , res , next)=>{
    try {
        res.json({"msg" : " get user"})
    } catch (error) {
        next(error);
    }
} );

