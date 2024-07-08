// require('dotenv').config({path:'./env'})

import dotenv from "dotenv"

import mongoose from "mongoose"
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path:"./env"
})

connectDB()  


.then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR404: ",error);
        throw error;
              })
    
    app.listen(process.env.PORT || 8000 , ()=>{`Server is running at port : ${process.env.PORT}`} )
})
.catch((error)=>{
    console.log("MONGO DB CONNECTION FAILED !!!",error);
})


























/*
import express from "express"
const app =express()

( async()=>{                                                                                     //iife function [execute imediately] using syntax

    try {
        
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
  console.log("ERROR404: ",error);
  throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("ERROR",error);
        throw error
    }
} )()                    

*/
