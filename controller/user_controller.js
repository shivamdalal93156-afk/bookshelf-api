const {register , addbook , all_book , deletebook , login} = require("../services/user_services");

async function upload_cont(req,res,next) {
    try{
        if(!req.file){
            return res.status(404).send("no file uploaded");
        }
        return res.status(201).json({
            message : "file uploaded successfully",
            file : {
                name : req.file.filename,
                path : req.file.path,
                size : req.file.size
            }
        })
    }catch(err){
        next(err);
    }
}

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
        const UserId = req.user.id;
        await addbook(title , author , note , UserId);
        return res.status(201).send("book is added");
    }catch(err){
        next(err);
    }
}

async function all_book_cont(req,res,next) {
    try{
        const UserId = req.user.id;
        const books = await all_book(UserId);
        return res.status(200).send(books);
    }catch(err){
        next(err);
    }
}

async function delete_book_cont(req,res,next) {
    try{
        const UserId = req.user.id;
        await deletebook(req.params.id , UserId);
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
        token : token
    });
    }catch(err){
        next(err);
    }
}

module.exports = {register_user_cont , addbook_cont , all_book_cont , delete_book_cont , login_user_cont , upload_cont};