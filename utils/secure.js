//CheckRole 
// const checkRole =  ()=>
//     userRole.some((item) => sysRole.includes(item));

  
// const mw =  (req ,  res , next)=>{
//     const {username  , password} = req.headers;
//     if(username === "dipershan" && password === "password"){
//         next();

//     }
//     res.status(404).json({msg:"User Authorized"});
// }
// const mw =  (sysRole)=>{
//     return (req ,  res  , next) =>{
//         const  {role} =  req.headers;
//         const result =  checkRole([role] ,  sysRole);
//         if(!result) res.status(400).json({msg:"Unauthorized"})
//         next();

//     };   
// };

const {verifyToken , checkRole} = require("./token");

const secure = (sysRole) =>{

    return async(req ,  res , next) =>{  
        try {
           
            const {token} =  req.headers;
            //what to do if no token
            if(!token) throw Error("Token is missing");
            //check the token valid or not
            const isValid =  verifyToken(token);
            //TOken expired
            if(!isValid)  throw Error("Token is expired");
            const {data} =  isValid;
            //Check user email with database
            const userInfo =  await userModel.findOne({
                email: data?.email,
                isActive: true,
                isEmailVerified: true,
            });
            if(!userInfo) throw new Error("user not found");
            //RBAC vs PBAAC vs ABAC
            const validRole =  checkRole({sysRole , userRole: data?.roles || []});
            if(!validRole) throw new Error("User unauthorizede");
            req.currentUser = userInfo?._id;
            // req.body.createdBy = userInfo?._id;
            next();
            console.log({data  ,  sysRole});
        } catch (error) {
            next(error)
        }    
    }
}


module.exports = {secure};