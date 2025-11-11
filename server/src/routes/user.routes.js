const express = require("express");
const { registerUser, getUserBYId, loginUser } = require("../controllers/user.controller");
const protect = require("../middlewares/auth.middleware");
const { getUserResume } = require("../controllers/resume.controller");

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/data", protect, getUserBYId)
router.get("/resumes",protect,getUserResume)

module.exports=router
