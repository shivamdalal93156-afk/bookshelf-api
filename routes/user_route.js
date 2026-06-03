const {login_user_cont , addbook_cont ,all_book_cont ,register_user_cont , delete_book_cont} = require("../controller/user_controller");
const {bookschema} = require("../schema/book_schema")
const {loginschema ,registerschema} =   require("../schema/auth_schema")
const {jwttoken ,validate} = require("../middleware/auth")

const express = require("express");

const router = express.Router();

router.get("/books",jwttoken , all_book_cont );

router.post("/login",validate(loginschema) , login_user_cont );

router.post("/register" , validate(registerschema) , register_user_cont);

router.delete("/delete" , jwttoken , delete_book_cont);

router.post("/add_book" , validate(bookschema) , jwttoken , addbook_cont);

module.exports = router;
