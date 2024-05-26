const {Schema  ,  model} = require("mongoose");
const {ObjectId} =  Schema.Types;
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
    price:{
        type:Number,
        required:true,
        default:0,
    },
    createdBy:{
        type: ObjectId,
        ref:"User",

    },
    updatedBy:{
        type : ObjectId,
        ref:""
    }




});

https: module.exports = model("Movie" ,  movieSchema);

/**
 * STep 1
 * update model
 * const {ObjectId}  =  Schema.Types;
 * type: ObjectId  ,  ref:"User"
 * 
 * Step 2
 *  secure currentUser
 * 
 * Step 3
 * use thereq.currentUser
 * to add new req.body.createdBy / req.body.updateBy
 * 
 */