const router =  require("express").Router();
const { secure } =  require("../../utils/secure");
const orderController = require("./order.controller");

/**
 * Create
 * list
 * read one order
 * delete the order
 * change the status of order
 * updta
 */


///secure()
router.post("/"  ,async (req , res , next)=>{
    try {
        const result = await orderController.create(req.body);
        
        res.json({"msg" : "created order"  ,  data:result})
    } catch (error) {
        next(error);
    }
} );

router.get("/"  , (req , res , next)=>{
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