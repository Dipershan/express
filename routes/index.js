const express =  require("express");
const router =  express.Router();

const movieRouter =  require("../modules/movies/movie.api");
const userRouter =  require("../modules/users/user.api");
const orderRouter =  require("../modules/orders/order.api");







router.get("/api/v1",(req ,  res , next) =>{
    try {
        res.json({msg:"Movie Plex"});

    } catch (error) {
        next(error);
    }
})



 router.use("/api/v1/movies" , movieRouter);
 router.use("/api/v1/orders" , orderRouter);
 router.use("/api/v1/users" , userRouter);

module.exports  = router;

