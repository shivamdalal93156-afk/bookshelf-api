const jwt = require("jsonwebtoken");


async function jwttoken(req,res,next) {
    try{
    const authheader = req.headers.authorization;
    if(!authheader || !authheader.startsWith("Bearer")){
        return res.status(403).send("unauthorized");
    }
    const token = authheader.split(" ")[1];
    if(!token){
        return res.status(403).send("invalid token");
    }
    const decoded = jwt.verify(token , process.env.JWT_TOKEN);
    if(!decoded){
        return res.status(403).send("unauthorized");
    }
    req.user = decoded;
    next();
   }catch(err){
    next(err);
   }}


function validate(schema) {
    return (req,res,next)=>{
        const result = schema.safeParse(req.body);

        if(!result.success){
            const error = result.error.errors.map(err =>({
                field : err.path[0],
                message : err.message
            }))
            return res.status(400).send(error)
            }
        
        req.body = result.data;
        next();
    }
    }


 module.exports = {validate , jwttoken};