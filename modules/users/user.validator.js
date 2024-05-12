const Joi  = require("joi");

//Schema

const schema = Joi.object({
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

})

//Middleware for validator
const validator =async (req , res , next) =>{
    
try {
    const value = await schema.validateAsync({ email });
}
catch (err) { 
    next(err)
}
}


module.exports = {validator};

