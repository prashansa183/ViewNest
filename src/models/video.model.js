import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { User } from "./user.model";

const videoSchema= new  Schema(
  {
    videoFile:{
      type:String,
      required:true

    },
    thubnail:{
      type:String,
      required:true
    },
    title:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    duration:{
      type:Number,
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
    Owner:{
      type:Schema.type.ObjectId,
      ref:"User"
    },
    
  },{timestamps:true}
)

videoSchema.plugin(mongooseAggregatePaginate)


export const video=mongoose.model("video",videoSchema) 