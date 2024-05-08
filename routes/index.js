const express =  require("express");
const router =  express.Router();

const movieRouter =  require("../modules/movies/movie.api");
const orderRouter =  require("../modules/orders/order.api");
const orderRouter =  require("../modules/users/user.api");







router.get("/api/v1",(req ,  res , next) =>{
    try {
        res.json({msg:"Movie Plex"});

    } catch (error) {
        next(error);
    }
})

// //login scenario

// router.post("/" ,  (req ,  res) => {
//     try {
//         const  {email ,  password} =  req.body;
//         console.log({email , password});
//         //logic
//         if(email !== "dipsestha@gmail.com" || password !== 123){
//             throw new Error("Invalid Credintials");
//         }
//        res.json({msg:"Post movies"})
   
//     }catch (error) {
//         console.log({error});
//     }
// });

// app.listen(PORT , () =>{
//     console.log(`Application is running on ${PORT}`);
// });


router.use("/api/v1/movies" , movieRouter);
router.use("/api/v1/orders" , orderRouter);
router.use("/api/v1/user" , userRouter);

module.exports  = router;

// default destructure