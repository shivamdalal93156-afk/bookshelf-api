const {register , addbook , all_book , deletebook , login} = require("../services/user_services");

async function register_user_cont(req,res,next) {
    try{
    const {name , email , password , phone_no} = req.body;
    await register(name , email , password , phone_no);
    return res.status(201).send("user si registered");
    }catch(err){
        next(err);
    }
}
async function addbook_cont(req,res,next) {
    try{
        const {title , author , note} = req.body;
        await addbook(title , author , note);
        return res.status(201).send("book is added");
    }catch(err){
        next(err);
    }
}

async function all_book_cont(req,res,next) {
    try{
        const books = await all_book();
        return res.status(200).send(books);
    }catch(err){
        next(err);
    }
}

async function delete_book_cont(req,res,next) {
    try{
        await deletebook(req.params.id);
        return res.status(200).send("entry is deleted");
    }catch(err){
        next(err);
    }
}

async function login_user_cont(req,res,next) {
    try{
    const {email , password} = req.body;
    const token = await login(email ,password);
    return res.status(200).json({message : "user is login successfully",
        token = token
    });
    }catch(err){
        next(err);
    }
}

module.exports = {register_user_cont , addbook_cont , all_book_cont , delete_book_cont , login_user_cont};