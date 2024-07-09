import mongoose, { Schema }  from "mongoose";


import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema({

        videoFile:{
            type:String,        // cloudnary url
            required:true,

        },
        thumbnail:{
            type:String,         // cloudnary url
            required:true,

        },
        title:{
            type:String,
            required:true,

        },
        description:{
            type:String,         
            required:true,

        },
        duration:{       // by cloudnary 
            type: Number,         
            required:true

        },

        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner :{
            type:Schema.Types.ObjectId,
            ref: ""
        }



},{
   timestamps:true 
}
)


videoSchema.plugin(mongooseAggregatePaginate)        //aggregation pipeline{watchhistory}

export const Video =mongoose.model("Video" ,videoSchema)
