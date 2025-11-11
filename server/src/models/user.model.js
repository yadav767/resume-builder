const mongoose=require("mongoose");
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timeseries:true
})

userSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password);
}


const userModel=mongoose.model("user",userSchema)

module.exports=userModel;