const router =  require("express").Router();

/**
 * Create
 * list
 * read one order
 * delete the order
 * change the status of order
 * updta
 */

const mw =  (req ,  res , next)=>{
    const {username  , password} = req.headers;
    if(username === "raktim" && password === "password"){
        next();

    }
    res.status(404).json({msg:"User Authorized"});
}


//Create
router.post("/" ,(req , res , next)=>{
    try {
        
        res.json({"msg" : "create order"})
    } catch (error) {
        next(error);
    }
} );

router.get("/" ,mw , (req , res , next)=>{
    try {
        
        res.json({"msg" : "List order"})
    } catch (error) {
        next(error);
    }
} );

//List one order
router.get("/:id" ,(req , res , next)=>{
    try {
        const { id }  = req.params.id ;
        res.json({"msg" : "Get one order"})
    } catch (error) {
        next(error);
    }
} );

//Delete
router.delete("/:id" ,(req , res , next)=>{
    try {
        const { id }  = req.params.id ;
        res.json({"msg" : `Delete  order no ${id} `})
    } catch (error) {
        next(error);
    }
} );

//Change  status data
router.patch("/:id/status" ,(req , res , next)=>{
    try {
        const { id }  = req.params.id ;
        

        res.json({"msg" :  `Change  status of  one order by ${id} `})
    } catch (error) {
        next(error);
    }
} );

//Update
router.put("/:id" ,(req , res , next)=>{
    try {
        const { id }  = req.params.id ;
        

        res.json({"msg" :  `Update one  order by ${id} `})
    } catch (error) {
        next(error);
    }
} );

module.exports =  router;