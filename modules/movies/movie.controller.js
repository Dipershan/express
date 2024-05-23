
const movieModel =  require("./movie.model");
const {slugger} =  require("../../utils/text");




//movie create
const create = async(payload) =>{

    

    const result  =  await movieModel.create(payload);
    //create slug from title (slugify)
    const slug =  slugger(payload?.title);
    //check if the dlug exist in db
    const movie  = await movieMdoel.findOne({slug});;
    if(movie) throw new Error("Movie titlte is already in use");
    //create the movie
    payload.slug =  slug;
    return movieModel.create(payload);
};


const list = () =>{

}



//
const getBySlug = (slug)=>{
    return userModel.findOne({_id:id});
};

//update release date
const updateReleaase = (id , payload) =>{
    //check releaseDate is less than today(moment , luxon  ,  dta-fns
    return movieModel.findOneAndUpdate({_id: id} ,  payload ,{new : true}); 
};

//update movie detial
 const update = (id , payload) =>{
    return movieModel.updateOne({_id:id} ,payload )
};


//update seat number (update seats)
const updateSeats = (id  , payload) =>{
    //check if the movie seats are less than defined number
    return movieModel.findOneAndUpdate({_id:id} ,  payload)
};


//delete movie
const remove = (id) =>{
    //movie ticket should not be sold
    //movie should not ongoing (should not betwween release and date).
    return userModel.deleteOne({_id:id});
};


module.exports = {
    create,
    getById,
    list,
    update,
    updateSeats,
    updateReleaase,
    remove

}
