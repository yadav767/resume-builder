const express=require("express");
const protect = require("../middlewares/auth.middleware");
const { enhanceProfessionalSummary, enhanceJobDescription, uploadResume } = require("../controllers/aiController");
const router=express.Router();

router.post("/enhance-pro-sum",protect,enhanceProfessionalSummary)
router.post("/enhance-job-desc",protect,enhanceJobDescription)
router.post("/upload-resume",protect,uploadResume)

module.exports=router

