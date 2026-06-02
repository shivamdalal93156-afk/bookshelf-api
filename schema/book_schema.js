const {z} = require("zod");

const bookschema = z.object({
    title : z.string()
    .min(10,"min length should be 10")
    .max(100,"max length could be 100"),

    author : z.string()
    .min(10,"min length should be 10")
    .max(100,"max length could be 100"),

    note: z.string()
    .min(10,"min length should be 10")
    .max(100,"max length could be 100"),

})

module.exports = {bookschema};