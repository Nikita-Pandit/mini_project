
const {createTeacherProfileInfo,getTeacherProfileInfo,getTeacherProfileImage}=require("../Controllers/teacherProfileController")
const express=require("express")
const multer=require("multer")
const router=express.Router();

const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        return  cb(null,`${Date.now()}-${file.originalname}`);
    }
})


const upload = multer({ storage: storage})



//teacher
router.post("/teacherProfile/:id",createTeacherProfileInfo);
router.post("/teacherProfile/:id/uploadImage",upload.single('image'),getTeacherProfileImage);
router.get("/teacherProfile/:id",getTeacherProfileInfo)
//-------------------------------------------


module.exports=router