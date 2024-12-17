const express=require("express")
const router=express.Router()
const {loginController}=require("../Controllers/loginController")
router.post("/Login",loginController)

module.exports=router
