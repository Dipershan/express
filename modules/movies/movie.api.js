const router =  require("expresss").Router();
const {secure } = require("../../utils/secure");
const movieController = require("./movie.controller1");




router.get("/"  ,  (req ,  res ,  next)=>{
    try {
       res.json({msg: "All movies list"}) 
    } catch (error) {
        next(error)
    }
});



//Read one movie

router.get("/:id" ,async(req , res , next) =>{
    try{
        const {id}  =  req.params;
        const result =  await movieController.getById(id)
        res.json({msg:`Read one movie by ${id}`});
    }
    catch(error) {
        next(error)
    }
});



//updateRelease 
router.put("/:id/release-date" ,secure(["admin"]) ,  (req , res , next) =>{
    try{
    const {id} = req.params;
    res.json({msg:`Update one movie by ${id}`});
    }
    catch(error) {
        next(error)
    }
});


//.update the seats number 
router.patch("/:id/seats" , (req , res , next) =>{
    try{
        const {id} = req.params;
        res.json({msg:`Update the  seats numebr of one movie by ${id}`});
    }
    catch(error) {
        next(error)
    }
});


//.update one movie
router.put("/:id" ,secure(['admin']) , async(req , res , next) =>{
    try{
        const {id} = req.params;
        const result = await movieController.update(id ,  req.body)
        res.json({msg:`Update one movie by ${id}`  ,  data: result});
    }
    catch(error) {
        next(error)
    }
});

router.delete("/:id" , async(req , res , next) =>{
    try{
        const {id} = req.params;
        const result = await movieController.remove(id )
        res.json({msg:`delete movie by ${id}`  ,  data: result});        

    }
    catch(error) {
        next(error)
    }
});