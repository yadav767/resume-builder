const express=require("express");
const protect = require("../middlewares/auth.middleware");
const { createResume, updateResume, deleteResume, getResumeById, getPublicResumeById } = require("../controllers/resume.controller");
const upload = require("../middlewares/multer");
const router=express.Router();

router.post('/create',protect,createResume);
router.put("/update",upload.single('image'),protect,updateResume)
router.delete('/delete/:resumeId',protect,deleteResume);
router.get('/get/:resumeId',protect,getResumeById);
router.get('/public/:resumeId',getPublicResumeById);



module.exports=router
