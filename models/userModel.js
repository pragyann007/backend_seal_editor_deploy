import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    codes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Code"
        }
    ]
})

export const User =  mongoose.model("User",userSchema)