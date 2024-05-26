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
    // if(!duplicateEmail) throw new Error("Email already in use ");
    //Hash the password
    payload.password =   genHash(password);
    //create user
    const result = await userModel.create(payload);
    //Emit signup event
    eventEmitter.emit("signup" , email);

    return result;

};


const login = async (payload) => {
    const { email, password } = payload;

    // Check for user by email and if they are active
    const user = await userModel.findOne({ email, isActive: true });

    // Check if user exists
    if (!user) {
        throw new Error("User not found");
    }

    // Check if the user's email is verified
    const isVerified = user.isEmailVerified;
    if (!isVerified) {
        throw new Error("Email Verification required");
    }

    // Validate the password
    const isValidPw = compareHash(user.password, password);
    if (!isValidPw) {
        throw new Error("Email or password invalid");
    }

    // Prepare token payload
    const tokenPayload = {
        name: user.name,
        roles: user.roles,
    };

    // Generate token
    const token = generateToken(tokenPayload);
    if (!token) {
        throw new Error("Something went wrong");
    }

    return token;
};


const getById = (id)=>{
    return userModel.getById({_id:id});
};

const list = async() =>{
    
    const query =  [];
    //Search
    if(search?.name){
        query.push(
            
                {
                  '$match': {
                    'name': new RegExp(search?.name, 'gi')
                  },
                }
            );
    }


    if(search?.email){
        query.push(
            
                {
                  '$match': {
                    'email': new RegExp(search?.name, 'gi')
                  },
                }
            );
    }
    //Sort
    query.push({
        $sort:{
            createdAt:1,
            
        }
    })
    //Filter
    
    //Pagination 
    query.push(  
    
          {
    $facet: {
      metadata: [
        {
          $count: total
        }
      ], 
      data: [
        {
          $skip: (+page -1) * +limit,
        }, {
          $limit: +limit,
        }
      ]
    }
  }, {
    $addFields: {
      total: {
        '$arrayElemAt': [
          '$metadata.total', 0
        ]
      }
    }
  }, {
    '$project': {
      'metadata': 0, 
      'data.password': 0
    }
  });
    const result =  await userModel.aggregate(query);
    return  {
        total: result[0]?.total || 0,
        users: result[0]?.data,
        page:+page,
        limit:+limit,
    }


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
    getById,
    generateEmailToken,
    verifyEmailToken
}