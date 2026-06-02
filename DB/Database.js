const mongoose = require("mongoose");

async function connectdb() {
    try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb server is live");
    }catch(err){
        console.log("mongodb server is not live");

        process.exit(1);
    }
}

module.exports = connectdb;