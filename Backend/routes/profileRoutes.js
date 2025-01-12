const {createProfileInfo,getProfileInfo,getProfileImage}=require("../Controllers/profileController")
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
router.post("/Profile/:id",createProfileInfo);

router.post("/Profile/:id/uploadImage",upload.single('image'),getProfileImage);
router.get("/Profile/:id",getProfileInfo)
module.exports=router