const router =  require("expresss").Router();
const {secure } = require("../../utils/secure");
const movieController = require("./movie.controller1");





//list
router.get("/:id" , (req , res , next) =>{
    try{

    }
    catch(error) {
        next(error)
    }
});

//updateRelease 
router.put("/update-release" ,secure(["admin"]) ,  (req , res , next) =>{
    try{

    }
    catch(error) {
        next(error)
    }
});


//.update the movie
router.patch("/update-movie/:id" , (req , res , next) =>{
    try{

    }
    catch(error) {
        next(error)
    }
});


//update seats
router.put("/update-seat" , (req , res , next) =>{
    try{
        
    }
    catch(error) {
        next(error)
    }
});

router.delete("/:id" , (req , res , next) =>{
    try{

    }
    catch(error) {
        next(error)
    }
});