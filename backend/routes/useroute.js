const { Router } = require("express");
const { getUser, createUser, updateuser, deleteuser, loginup, allbookinguser, getUserById, verifyUser, resetPassword } = require("../controllers/usercontroller");


const userrouter = Router();

userrouter.get("/",getUser);
userrouter.get("/:id",getUserById)
userrouter.post("/verify", verifyUser);
userrouter.post("/reset-password", resetPassword);
userrouter.post("/signup",createUser);
userrouter.patch("/update/:id",updateuser);
userrouter.delete("/delete/:id",deleteuser);
userrouter.post("/login",loginup)
userrouter.get("/booking/:id",allbookinguser)


module.exports =userrouter