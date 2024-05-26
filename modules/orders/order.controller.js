const  orderModel =  require("./order.model");

//create a order
const create = (payload) =>{
    return orderModel.create(req.body);
};

//get order
const getById = (id ,  payload) =>{

};
//update the order
const updateById = (id ,  payload) =>{

};

//List the order
const list = ({page , limit , search}) =>{

}

//change the status
const changeStatus = (id  , payload) =>{

};

module.exports = {
    create ,
    getById,
    list,
    updateById,
    changeStatus

}