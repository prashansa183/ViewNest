import mongoose,{Schema} from "mongoose";

const userSchema=new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowecase:true,
    trim:true,
    index:true
  },
   email:{
    type:String,
    required:true,
    unique:true,
    lowecase:true,
    trim:true,
    
  },
  fullname:{
    type:String,
    required:true,
    lowecase:true,
    trim:true,
  },
  avatar:{
    type:String,
    required:true,
  },
  coverImage:{
    type:String,

  }
  ,watchHistory:{
    type:Schema.Types.ObjectId,
    ref:"video"
  },
  password:{
    type:String,
    required:[true,'Password is required']
  },
  refreshToken:{
    type:String
  }
 
},
{
  timestamps:true
})

userSchema.pre("save",async function (next) {
  if(!this.isModified("password")) return next();
  this.password=bcrypt.hash(this.password,10)
  next()
})

userSchema.method.isPasswordCorrect= async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.method.generateAccessToken=function(){
  jwt.sign(
    {
      _id:this._id,
      email:this.username,
      username:this.username,
      fullname:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.method.generateRefreshToken=function(){
  jwt.sign(
    {
      _id:this._id,
      email:this.username,
      username:this.username,
      fullname:this.fullName
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}


export const User=mongoose.model("User",userSchema)