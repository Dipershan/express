
const movieModel =  require("./movie.model");



//movie create
const create = async(payload) =>{

    

    const result  =  await movieModel.create(payload);
    //create slug from title (slugify)
    const slug =  "";
    //check if the dlug exist in db
    const movie  = await movieMdoel.findOne({slug});;
    if(movie) throw new Error("Movie titlte is already in use");
    //create the movie
    payload.slug =  slug;
    return movieModel.create(payload);
};
const list = () =>{

}

const getById = (id)=>{
    return userModel.findOne;
};


const updateReleaase = (id , payload) =>{
    return movieModel.findOneAndUpdate();
};

const update = (id , payload) =>{

};

const updateSeats = (id  , payload) =>{
    //check if the movie seats are less than defined number
    return movieModel
};

const remove = (id) =>{
    return userModel.deleteOne;
};


module.exports = {
    create,
    getById,
    updateupdateSeats,
    updateReleaase,
    remove

}
