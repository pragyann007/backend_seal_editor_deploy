import express from "express"
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req,res)=>{
    try {
        const {name,email,password} = req.body ; 
        if(!name||!email||!password){
            return res.status(400).json({message:"empty credentials .. "})
        }
    
        const emailExists = await User.findOne({email});
        if(emailExists){
            return res.status(400).json({message:"User already exists"})
    
        } 
    
        const hashPass =await bcrypt.hash(password,14)
    
        const user = await User.create({
            name,
            email,
            password:hashPass
        })
    
        return res.status(201).json({message:"User created SucessFully",user})
    } catch (error) {
        return res.status(400).json({message:"server error ",error})

        
    }
    
    

}

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Emty credentias ..."})
        }
    
        const userExists = await User.findOne({email})
    
        if(!userExists){
            return res.status(400).json({message:"User not exists please regiser first ."})
        }
    
        const checkPass = await bcrypt.compare(password,userExists.password);
    
        if(!checkPass){
            return res.status(400).json({message:"Invaid credentials .."})
        }
    
     
    
        const token = jwt.sign({
            id:userExists._id,
            name:userExists.name,
            email:userExists.email
        },process.env.SECRET,{expiresIn:"27d"});
    
        res.cookie("token",token);
        console.log(token)
    
        return res.status(200).json({message:"User logged in sucessfull ",userExists,token})
    } catch (error) {
        return res.status(400).json({message:"server error ",error})
        
    }
}