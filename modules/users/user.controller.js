const userModel  =  require("./user.model");
const {genHash ,  compareHash} =  require("../../utils/hash");
const events = require("events");
const {sendMail} =  require("../../utils/mailer");
const { generateToken , generateOtp } = require("../../utils/token");


const eventEmitter = new events.EventEmitter();

eventEmitter.addListener("signup" , (email)=>
    sendMail({
        email,
        subject:"MOviePlex SignUp",
        htmlMsg:"<b>Thanku for joining Movie Plex</b>"
    })
);

eventEmitter.addListener("emailVerification" , (email ,  otp)=>
    sendMail({
        email,
        subject:"MOviePlex verifications",
        htmlMsg:`<b>${otp}</b> is your otp token`
    })
)



const create = async(payload) =>{
    const {email  , password}  =  payload;
    const duplicateEmail =  await userModel.findOne({email});
    if(!duplicateEmail) throw new Error("Email already in use ")
    payload.password =   genHash(password);
    const result = await userModel.create(payload);
    return result;

    
        //call the nodemailer
       
        eventEmitter.emit("signup" , email);
};


const login = async(payload) =>{
    const {email  , password} = payload;
    //check for email
    const user = await userModel.findOne({email , isActive: true});
    //check if user exist
    if(!user) throw new Error("User not found");
    const isVerified =  user?.isEmailVerified;
    if(!isVerified) throw new Error("Email Verification required")
    const isValidPw =  compareHash(user?.password , password);
    if(!isValidPw)  throw new Error("Emailor password invalid");
    const tokenPayload =  {
        name: user?.name,
        roles: user?.roles, 
    };
    const token  =  generateToken(tokenPayload);
    if(!token)  throw new Error("Something is wrong");
    return token;

}

const getById = (id) => {
    return userModel.findOne({_id:id});
};

const list = () =>{
    return userModel.find(payload);
};

const updateById = (id , payload) =>{
    return userModel.updateOne({_id:id} , payload);
};

const removeById = (id) =>{
    return userModel.deleteOne({_id:id});
};


const generateEmailToken = async(payload)=>{
    const {email} =  payload;
    const user = await userModel.findOne({email ,  isActive:true})
    if(!user) throw new Error("User not found");
    const isVerified =  user?.isEmailVerified;
    if(!isVerified) {
        const otp = generateOtp();
        console.log(`Generated OTP: ${otp}`); // Log the generated OTP
        const updateUser = await userModel.updateOne({ _id: user._id }, { otp });
        if (!updateUser) throw new Error("Something is wrong");
        console.log(`Updated User: ${JSON.stringify(updateUser)}`); // Log the update result
        eventEmitter.emit("emailVerification", email, otp);
    }
    return true;

};


const verifyEmailToken = async(payload) =>{
    const {email , token} =  payload;
    const user = await userModel.findOne({email ,  isActive:true})
    if(!user) throw new Error("User not found");
    const isTokenValid =  user?.otp === token;
    if(!isTokenValid) throw new Error("Token mismatch");
    const result = await userModel.updateOne(
        {_id: user?._id} ,
        {isEmailVerified: true , otp: ""} 
    );
    if(!result) throw new Error("Someting went wrong");
    return isTokenValid;

    
};








module.exports = {
    create ,
    login , 
    generateEmailToken,
    verifyEmailToken
}