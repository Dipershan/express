require("dotenv").config()

const express =  require("express");

const app  =  express();
const router =  express.Router();

const PORT =  process.env.PORT;


router.post("/register",(req ,  res , next) =>{

})

//login scenario

router.post("/" ,  (req ,  res) => {
    try {
        const  {email ,  password} =  req.body;
        console.log({email , password});
        //logic
        if(email !== "dipsestha@gmail.com" || password !== 123){
            throw new Error("Invalid Credintials");
        }
       res.json({msg:"Post movies"})
   
    }catch (error) {
        console.log({error});
    }
});

app.listen(PORT , () =>{
    console.log(`Application is running on ${PORT}`);
});

module.exports  = router;

// default destructure