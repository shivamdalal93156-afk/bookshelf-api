const {register , addbook , all_book , deletebook , login} = require("../services/user_services");

async function register_user(req,res,next) {
    try{
    const {name , email , password , phone_no} = req.body;
    await register(name , email , password , phone_no);
    }catch(err){
        next(err);
    }
}
async function addbook(req,res,next) {
    try{
        const {title , author , note} = req.body;
        await addbook(title , author , note);
    }catch(err){
        next(err);
    }
}

async function all_book(req,res,next) {
    try{
        await all_book();
    }catch(err){
        next(err);
    }
}

async function delete_book(req,res,next) {
    try{
        await deletebook(req.params.id);
    }catch(err){
        next(err);
    }
}

async function login(req,res,next) {
    try{
    const {email , password} = req.body;
    await login(email ,password);
    }catch(err){
        next(err);
    }
}

module.exports = {register_user , addbook , all_book , delete_book , login};