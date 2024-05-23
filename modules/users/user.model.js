const { required } = require("joi");
const { Schema ,  model } =  require("mongoose");

const userSchema = new Schema(
    {
    name : {
        type:String,
        required:true,
        unique:true,

    },
    password:{
            type:String ,
            required:true
        },
    roles: {
            type: [String],
            default: ["user"],
            required:true,
        },
     image: {
        type: String
    },
    otp: {
        type:String,
        
    },
    isEmailVerified : {
        type:Boolean ,
        required:true,
        default:false,
    },
    isActive :{
        type:Boolean,
        required: true,
        default: true,
    },

    },
    {timestamps: true}

    
);



module.exports = model("User" ,  userSchema);
