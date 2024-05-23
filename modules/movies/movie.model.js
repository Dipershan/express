const {Schema  ,  model} = require("mongoose");
//SChema

const movieSchema = new Schema({

    title: {
        type:String,
        required:true,
        unique: true
    },
    slug :{

    },
    duration:{
        type:String,
    }  ,

    synopsis:{
            type:String,
    },
    poster: {
        type:String ,  
        required: true
    },
    releaseDate:{
        type:Date,
        required:true,
        default:Date.now(),
        
    },
    seats:{
        type:Number,
        required:true,
        default:0
    },



});

module.exports = model("movie" ,  movieSchema);