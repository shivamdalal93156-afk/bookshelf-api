const {z} = require("zod");

const registerschema = z.object({
    name : z.string()
    .min(6,"min length of name should be greater than 6")
    .max(20,"max length can be 20"),

    email : z.string()
    .email("please enter avalid email"),

    password : z.string()
    .min(8 , "min length of password shhould be 8"),

    phone_no : z.string()
    .min(10 , "phone length should be 10 digit")
    .max(10, "phone length should be 10 digit")
}) 

const loginschema = z.object({
    email : z.string()
    .email("please netry valid email"),

    password : z.string()
    .min(8 , "min length should be 8")
})

module.exports = {registerschema , loginschema}