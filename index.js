require("dotenv").config()
const express =  require("express");

const indexRouter =  require("./routes");
const router =  express.Router();
const app  =  express();
const PORT =  process.env.PORT;

//I can parse request body as json || Middleware
app.use(express.json());
//I am routing mechanism  , I will send the API index from/to indexrouter
app.use("/" ,  indexRouter);

//Error Handling
app.use((err , req , res, next) =>{
    const errorMsg =  err ? err.toString() : "Something went Wrong";
    res.status(500).json({msg:errorMsg});
});



app.listen(PORT , () =>{
    console.log(`Application is running on ${PORT}`);
});

module.exports  = router;

// default destructure
/**
 * git config --global user.email "you@example.com"
git config --global user.name "Your Name"

 */