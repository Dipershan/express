require("dotenv").config()

const express =  require("express");

const app  =  express();
const PORT =  process.env.PORT;


app.get("/" ,  (req ,  res)=>{
    res.json({msg:"HelloWorld"});
})

app.listen(PORT , () =>{
    console.log(`Application is running on ${PORT}`);
});




// default destructure