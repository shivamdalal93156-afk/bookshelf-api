const book = require("../models/Book_model");
const user = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function register(name , email , password , phone_no) {
    const existing = await user.findOne({email : email});
    if(existing){
        const err = new Error("book with title already exist");
        err.status = 400;
        throw err
    }
    const hashpassword = await bcrypt.hash(password , 10);
    const newuser = await user.create({
        name , 
        email,
        password : hashpassword,
        phone_no
    })
}

async function login(email , password) {
    const existing = await user.findOne({email : email});
    if(!existing){
        const err = new Error("no user found");
        err.status = 404;
        throw err;
    }
    const match = await bcrypt.compare(password , existing.password);
    if(!match){
        const err = new Error("password is invalid");
        err.status = 401;
        throw err;
    }
    const token = jwt.sign(
        {id : existing._id , email : existing.email},
        process.env.JWT_TOKEN,
        {expiresIn : "7d"}    
    );
    return token;
}

async function addbook(title , author , note , UserId ) {
    const existing = await book.findOne({title : title , userId : UserId});
    if(existing){
        const err = new Error("title with same book already exist in your self");
        err.status = 400;
        throw err;
    }
    const newbook = await book.create({
        title,
        author,
        note,
        userId : UserId,
    })
}

async function all_book(UserId) {
    const allbook = await book.find({userId : UserId});
    return allbook;
}

async function deletebook(id , UserId) {
        const delete_book = await book.findOneAndDelete({_id : id , userId : UserId});
        if(!delete_book){
            const err = new Error("no book exist with given id");
            err.status = 404;
            throw err;
        }
}

module.exports = {deletebook,all_book,addbook,login , register };