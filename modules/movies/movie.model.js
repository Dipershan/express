const {Schema  ,  model} = require("mongoose");
//SChema

const movieSchema = new Schema({

    title: {
        type:String,
        required:true,
        unique: true
    },
    slug :{
        type:String,
        unique:true,
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
    endDate:{
        type:Date,
        required:true,
    },
    seats:{
        type:Number,
        required:true,
        default:0
    },



});

module.exports = model("Movie" ,  movieSchema);