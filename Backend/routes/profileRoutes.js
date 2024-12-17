const {profileController}=require("../Controllers/profileController")
const express=require("express")
const multer=require("multer")
const router=express.Router();

const storage = multer.diskStorage({
   destination: 'uploads',
    filename: (req, file, cb) => {
        return  cb(null,`${Date.now()}${file.originalname}`);
    }
})


const upload = multer({ storage: storage})
router.post("/Profile",upload.single('image'),profileController);

module.exports=router