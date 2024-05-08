const router =  require("express").Router();


/**
 * Create
 * Read only one movie
 * Update
 * Delete
 * List
 * UPdate seats
 * Change the release ddate
 */

router.post("/api/v1/createMovie" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "Create User"})
    } catch (error) {
        next(error)
    }
});

router.post("/api/v1/readMovie" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "read Movie"})
    } catch (error) {
        next(error)
    }
});

router.put("/api/v1/updateMovie" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "Update movie"})
    } catch (error) {
        next(error)
    }
});

router.delete("/api/v1/deleteMovie" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "Delte Movie"})
    } catch (error) {
        next(error)
    }
});

router.get("/api/v1/listMovie" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "list movie"})
    } catch (error) {
        next(error)
    }
});

router.patch("/api/v1/updateOneMovie" , (req ,  res ,  next)=>{
    try {
        res.json({"msg" : "Update one movie"})
    } catch (error) {
        next(error)
    }
});

module.exports =  router;