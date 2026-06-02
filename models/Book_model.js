const mongoose  = require("mongoose");

const bookschema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    note : {
        type : String,
        required : true
    }
},
{timestamps : true})

const book = mongoose.model("book" , bookschema);

module.exports = book;