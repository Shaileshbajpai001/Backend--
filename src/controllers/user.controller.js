import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/Apierror.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from  "../utils/cloudinary.js"
import { Apiresponse } from "../utils/Apiresponse.js";

const registerUser = asyncHandler( async (req,res)=> {  
    // get user detail from frontend
    // validation -not empty
    // check if user already exist ::: by username or email
    // check for images ,check for avatar
    // upload them to cloudinary , check  avatar uploaded?
    // create user Object - creation call [ create entry in db ]
    // remove password and refresh token field
    // check for user creation
    // return response

      const { fullName , email, username ,password} = req.body
      console.log("email : " ,email);

    //   if(fullName === ""){
    //     throw new ApiError(400 ,"fullName is required")                    //beginer's method
    //   }'

    if([fullName,email,username,password].some((field)=> 
    field?.trim() === "" )
    )  {
   throw new ApiError(400,"All fields are required")
    }

     //
     
     User.findOne({
        $or: [{username},{email}]
     })

     if(existedUser) {
        throw new ApiError(409 ,"User or email already registered")
     }

     
     const avatarLocalPath = req.files?.avatar[0]?.path;
     const coverImageLocalPath  = req.files?.coverImage[0]?.path;

     if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar files is required")
     }
     const avatar = await uploadOnCloudinary(avatarLocalPath)        /// files upload hone mein time lagega thatswhy await here and async in starting  of code
     const coverImage = await uploadOnCloudinary(coverImageLocalPath)        /// files upload hone mein time lagega thatswhy await here and async in starting  of code

if(!avatar){
        throw new ApiError(400, "Avatar files is required")
        }



        // entry in database
    const user = await User.create({
       fullName,
       avatar: avatar.url ,
       coverImage : coverImage?.url || ""  ,    /// if coverImage not found than ""
       email,
       password,
       username: username.toLowerCase()

    
    })

    const createdUser =  await User.findById(user._id).select(
      "-password -refreshToken"
    )

    if(!createdUser){
      throw new ApiError(500, "something went wrong while registering the User")
    }

    return res.status(201).json(

     new Apiresponse(200, createdUser,"user registered successfully")

    )





 } )



export {
    registerUser,
}




