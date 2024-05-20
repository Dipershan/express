const Joi  = require("joi");

//Schema

const schema = Joi.object
({
    name: Joi .string(),
    email: Joi.string()
        .email({
             minDomainSegments: 1,
             tlds: { allow: ['com'] 
                    }
                })
    .required(),
    password: Joi.string().required(),
    roles: Joi.string().valid("admin", "user"),  // No .items() for a single string
    isEmailVerified: Joi.boolean(),
    Active :  Joi.boolean(),

    

})

//Middleware for validator
const validator =async (req , res , next) =>{
    
try {
    await schema.validateAsync(req.body);
    next();
}
catch (err) { 
    next(err)
}
};


module.exports = {validator};

