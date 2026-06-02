const {login , addbook ,all_book ,register_user , delete_book} = require("../controller/user_controller");
const {bookschema} = require("../schema/book_schema")
const {loginschema ,registerschema} =   require("../schema/auth_schema")
const {jwttoken ,validate} = require("../middleware/auth")

const express = require("express");

const router = express.router();

router.get("./books",jwttoken , all_book );

router.post("./login",validate(loginschema) , login );

router.post("./register" , validate(registerschema) , register_user);

router.delete("./delete" , jwttoken , delete_book);

router.post("./add_book" , validate(bookschema) , jwttoken , addbook);

module.exports = router;
