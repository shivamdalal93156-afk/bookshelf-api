const book = require("../models/Book_model");
const user = require("../models/user_model");
const bcrypt = require("bcrypt")


async function register(name , email , password , phone_no) {
    const {name , email , password , phone_no} = req.body;
    const existing = await user.findOne({email : email});
    if(existing){
        return res.status(400).json({message:"entry already exist for respective email"});
    }
    const hashpassword = await bcrypt.hash(password , 10);
    const newuser = await user.create({
        name , 
        email,
        password : hashpassword,
        phone_no
    })
    return res.status(201).send("user sign up successfully");
}

async function login(email , password) {
    const {email , password} = req.body;
    const existing = await user.findOne({email : email});
    if(!existing){
        console.log("no such user exist of given email");
    }
    const match = await bcrypt.compare(password , existing.password);
    if(!match){
        return res.status(401).send("invalid password");
    }
    const token = jwt.sign(
        {id : existing._id , email : existing.email},
        process.env.JWT_TOKEN,
        {expiresIn : "7d"}    
    )
    return res.status(200).json({
        message : "login successfully",
        token : token
    });
}

async function addbook(title , author , note ) {
    const {title , author , note} = req.body;
    const existing = await book.findOne({title : title});
    if(existing){
        return res.send(400).send("this entry already exist");
    }
    const newbook = await book.create({
        title,
        author,
        note
    })
    return res.status(201).send("book is added");
}

async function all_book() {
    const allbook = await book.find({});
    return res.status(200).send(allbook);
}

async function deletebook() {
        const delete_book = await book.findByIdAndDelete(req.params.id);
        if(!delete_book){
            return res.status(400).send("no entry found to delete");
        }
        return res.status(200).send("book entry is deleted");
}

module.exports = {deletebook,all_book,addbook,login , register };