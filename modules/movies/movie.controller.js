
const movieModel =  require("./movie.model");
const {slugger} =  require("../../utils/text");
const moment = require("moment");



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
    return movieModel.findOne();
}



//
// const getBySlug = (slug)=>{
//     return userModel.getBySlug({slug:id});
// };

//update release date
const updateReleaase = (slug , payload) =>{
    //TODO check releaseDate is less than today(moment , luxon  ,  dta-fns
    return movieModel.findOneAndUpdate({slug} ,  payload ,{new : true}); 
};

//update movie detial
 const update = (slug , payload) =>{
    if(payload.title){
    payload.slug =  slugger(payload?.title)        ;
    }
    return movieModel.updateOne({slug} ,payload )
};


//update seat number (update seats)
const updateSeats =async (slug  , payload) =>{
    //check if the movie seats are less than defined number
    if(payload.seats < process.env.NO_OF_SEATS){
        const movie  =  await movieModel.findOne({slug})
        throw new Error(`Movie seats cant be less than ${process.env.NO_OF_SEATS}`)
    }
    return movieModel.findOneAndUpdate({_id:id} ,  payload)
};


//delete movie
const remove  = async(slug) =>{
    const movie  =  await movieModel.findOne({slug});
    //movie ticket should not be sold
    
    if(
        moment(movie?.releaseDate).isBefore(moment()) &&
    moment(movie?.endDate).isAfter(moment())
    ){
        throw new Error("MOvie is currently running..")
    }
    return userModel.deleteOne({slug});
};


module.exports = {
    create,
    list,
    update,
    updateSeats,
    updateReleaase,
    remove

}
