const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const connectdb = require("./DB/Database");
const app = require("./app");


async function start_server() {
    await connectdb();

    app.listen(PORT , ()=>{
    console.log(`server is running at the ${PORT} port`)
})
}

start_server();