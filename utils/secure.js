//CheckRole 
const checkRole =  ()=>
    userRole.some((item) => sysRole.includes(item));

  
// const mw =  (req ,  res , next)=>{
//     const {username  , password} = req.headers;
//     if(username === "dipershan" && password === "password"){
//         next();

//     }
//     res.status(404).json({msg:"User Authorized"});
// }
const mw =  (sysRole)=>{
    return (req ,  res  , next) =>{
        const  {role} =  req.headers;
        const result =  checkRole([role] ,  sysRole);
        if(!result) res.status(400).json({msg:"Unauthorized"})
        next();

    };   
};


module.exports = {checkRole ,  mw };