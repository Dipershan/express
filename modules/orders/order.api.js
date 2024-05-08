const router =  require("express").Router();

/**
 * Create
 * list
 * read one order
 * delete the order
 * change the status of order
 */
router.post("/api/v1/list" ,(req , res , next)=>{
    try {
        res.json({"msg" : "list"})
    } catch (error) {
        
    }
} );



router.post("/api/v1/read" ,(req , res , next)=>{
    try {
        res.json({"msg" : "read"})
    } catch (error) {
        
    }
} );
router.delete("/api/v1/delete" ,(req , res , next)=>{
    try {
        res.json({"msg" : "order"})
    } catch (error) {
        
    }
} );

router.post("/api/v1/orders" ,(req , res , next)=>{
    try {
        res.json({"msg" : "order"})
    } catch (error) {
        
    }
} );




module.exports =  router;