const express = require("express");
const router = require("./routes/user_route");
const app = express();

app.use(express.json());

app.use("/",router);


app.use((req,res)=>{
    return res.status(400).send("no route exist");
})

app.use((err,req,res,next)=>{
    console.error(err.message);
    return res.status(err.status || 500).json({
        err : err.message || "something went wrong"
    })
})

module.exports = app ;