const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
    return token

}

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: " missing required data !"
            })
        }
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "user already exist !"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            name, email, password: hashedPassword
        })

        const token = generateToken(newUser._id)
        newUser.password = undefined;
        return res.status(201).json({
            message: "'User created successfully!", token, user: newUser
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        
        //Check if user exist
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid username or pass"
            })
        }
        
        //Check if pass is correct
        if(!user.comparePassword(password)){
            return res.status(400).json({
                message: "Invalid username or pass"
            }) 
        }

        const token=generateToken(user._id)
        user.password=undefined;
        return res.status(200).json({
            message:"Login successfull",token,user
        })
       
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}

async function getUserBYId(req, res) {
    try {
        const userId=req.userId

        //Check if user exist

        const user=await userModel.findById(userId)

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        user.password=undefined
        return res.status(200).json({
            user
        })
       
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}




module.exports = { registerUser, loginUser,getUserBYId }