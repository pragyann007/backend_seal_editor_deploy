import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    html: {
      type: String,
    },
    css: {
      type: String,
    },
    js: {
      type: String,
    },
    user:{
        type:mongoose.Types.ObjectId ,
        ref:"User"
    }
  },
  {
    timestamps: true, // ✅ automatically adds createdAt and updatedAt
  }
);

export const Code  =  mongoose.model("Code", codeSchema);
