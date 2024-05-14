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

