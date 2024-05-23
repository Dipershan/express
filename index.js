require("dotenv").config();
const morgan  =  require("morgan");
const mongoose =  require("mongoose");
const express =  require("express");

const indexRouter =  require("./routes");

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database Connected sucessful")
}).catch((e)=>{
    console.log("Database erorr" ,e)
})

const router =  express.Router();
const app  =  express();
const PORT =  process.env.PORT;

//I can parse request body as json || Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"))

//MiddleWare (application level custom mw)
// app.use((req ,res , next)=>{
//     req.body.country = "NP";
//     req.body.currency =  "NPR";
//     req.body.currentTime = new Date().toISOString();
//     next();
// })

//I am routing mechanism  , I will send the API index from/to indexrouter
//Route Handling
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

