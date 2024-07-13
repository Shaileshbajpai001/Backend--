import mongoose  from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true                             // if u want 2 use something in searching then mark index true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,   
        lowercase:true                       },
   fullName:{
        type:String,
        required:true,
         trim:true,   
         index:true
 },

 avatar:{
    type:String,    // we upload from cloudnery url
    
 },
 coverImage:{
    type:String     // cloudnary url
 },


 watchhistory:[
    {
        type: Schema.Types.ObjectId,
        ref : "Video"
    }
 ],

 password:{
    type:String,
    required:[true,'Password is required']
 },
 refreshToken:{
    type:String
 }

},{
    timestamps:true
})

userSchema.pre("save", async function (next) {                       // here we not use callback function because it doesn't have a refrence{like:this}
     if(!this.isModified("password"))  return next();
     
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateAccessToken =function(){
   return  jwt.sign(
        {
_id:this._id,
email:this.email,
username:this.username,
fullName:this.fullName
        },

        process.env.ACCESS_TOKEN_SECRET,
        {
            expireIn: process.env.ACCESS_TOKEN_EXPIRY
        }
     )

         
} 
userSchema.methods.generateRefreshToken =function(){

    return jwt.sign(
        {
                  _id:this._id,

        },

             process.env.REFRESH_TOKEN_SECRET,
        {
            expireIn:process.env.REFRESH_TOKEN_EXPIRY
        }
     )


} 

export const User = mongoose.model("User", userSchema)

