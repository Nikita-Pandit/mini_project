const express=require("express")
const router=express.Router()

const {forgotPasswordController}=require("../controllers/forgotPasswordController")
router.post("/forgot-password",forgotPasswordController)
module.exports=router