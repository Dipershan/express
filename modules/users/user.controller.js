const userModel  =  require("./user.model");


const create = (payload) =>{
    return userModel.create(payload);
};

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