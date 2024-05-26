const router =  require("express").Router();
const {secure } = require("../../utils/secure");
const movieController = require("./movie.controller");

const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload/movies')
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


//list
router.get("/"  ,async(req ,  res ,  next)=>{
    try {
    const result =  await movieController.list();
       res.json({msg: "All movies list" ,  data:result}) 
    } catch (error) {
        next(error)
    }
});


// secure(["admin"])
router.post("/"  ,upload.single("poster") ,async(req ,  res ,  next)=>{
    try {
        if(req.file){
            req.body.poster = req.file.path;
        };
        req.body.createdBy =  req.currentUser;
        const result =  await movieController.create(req.body);

       res.json({msg: "Created new movie" , data:result }) 
    } catch (error) {
        next(error)
    }
});




//Read one movie

router.get("/:slug" ,async(req , res , next) =>{
    try{
        const {slug}  =  req.params;
        const result =  await movieController.update(id ,  req.body);
        res.json({msg:`Read one movie by ${slug}` , data :result});
    }
    catch(error) {
        next(error)
    }
});



//updateRelease 
router.put("/:slug" ,secure(["admin"]) ,upload.single("poster") , (req , res , next) =>{
    try{
    const {slug} = req.params;
    res.json({msg:`Update one movie by ${slug}` ,  data :result});
    }
    catch(error) {
        next(error)
    }
});


//.update the seats number 
router.patch("/:slug/seats" , async(req , res , next) =>{
    try{
        const {slug} = req.params;
        req.body.updatedBy =  req.currentUser;
        const result =  await movieController.updateSeats(slug ,  req.body)
        res.json({msg:`Update the  seats numebr of one movie by ${slug}`});
    }
    catch(error) {
        next(error)
    }
});


//.update one movie
router.put("/:slug" ,secure(['admin']) , upload.single("poster"),async(req , res , next) =>{
    try{
        const {slug} = req.params;
        //IMP
        req.body.updatedBy =  req.currentUser;
        const result = await movieController.update(id ,  req.body)
        res.json({msg:`Update one movie by ${slug}`  ,  data: result});
    }
    catch(error) {
        next(error)
    }
});

router.delete("/:slug" , async(req , res , next) =>{
    try{
        const {slug} = req.params;
        const result = await movieController.remove(id )
        res.json({msg:`delete movie by ${slug}`  ,  data: result});        

    }
    catch(error) {
        next(error)
    }
});


module.exports = router;