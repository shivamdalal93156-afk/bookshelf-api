const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cd(null , "uploads/")
    },

    filename : function( req, file , cb){
        const uniquename = Date.now() + "-" + file.originalname;
        cb(null , uniquename)
    }
})

function filefilter(req , file , cb){
    const allowedfile = ['image/jpg' , 'image/png' , 'image/webp'];
    if(allowedfile.includes.apply(file.mimetype)){
        cb(null , true)
    }else {
        cb(new Error('only allowed type file is accepted'),false)
    }
}

const upload = multur({
    storage : storage,
    filefilter : filefilter,
    limits : {
        fileSize : 2 * 1024 * 1024,
    }
})

module.exports = upload;