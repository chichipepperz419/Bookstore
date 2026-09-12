import AppError from "../utils/AppError.js";
import { generateToken } from "../utils/token.js";
import type { Request, Response, NextFunction } from "express";
import userModel from "../model/user.model.js";
import bcrypt from  "bcrypt"
import crypto from "crypto"
import { sendWelcomeEmail } from "../services/Email.services.js";


const verificationToken = crypto.randomBytes(32).toString("hex");

const verificationExpired = new Date(Date.now() + 1000 * 60 * 5);
export const registerUser = async(
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try{
        const { name, email, password, role } = req.body
        const findExistingUser = await userModel.findOne({ email })
        if(findExistingUser){
            throw new AppError("User already exist", 401)
        }

         const verificationToken = crypto.randomBytes(32).toString("hex");
        
        const verificationExpired = new Date(Date.now() + 1000 * 60 * 5);

        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)

        const newUser = await userModel.create({
            name,
            email,
            password,
            role,
            verificationToken,
            verificationExpired
        })
        await sendWelcomeEmail(email, name , `${process.env.BASE_URL}/verify-email?token=${verificationToken}`).then(()=>{
              console.log("Email sent successfully");
            }).catch((error)=>{
              console.log("Error sending email", error);
            });
        return res.status(201).json({
            message: "User registered successfully",
            data: newUser
        })

    }catch (error){
        next(error)
    }
}

export const loginUser = async(
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try{
        const { email, password } = req.body;
        const findexistingUser = await userModel.findOne({ email })
        if(!findexistingUser){
            throw new AppError("User not found", 404)
        }
        const comparePassword = await bcrypt.compare(password, findexistingUser.password)
        if(!comparePassword){
            throw new AppError("Invalid credentials", 401)
        }
        //create token
        const Token = generateToken(findexistingUser._id, findexistingUser.email)

        return res.status(200).json({
            message:"User logged in successfully",
            data: findexistingUser,
            token: Token
        })

    }catch(error){
        next(error)
    }
}

export const getAllUsers = async(
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try{
        const users = await userModel.find()
        if(!users){
            throw new AppError("users not found", 404)
        }
        return res.status(200).json({
            message: "users retrieved successfully",
            data: users
        })

    }catch(error){
        next(error)
    }
}

export const getOneUser = async(
    req: Request,
    res: Response,
    next: NextFunction   
)=> {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id)
        if(!user){
            throw new AppError("user not found", 404)
        }
        return res.status(200).json({
            message:"user retrieved successfully",
            data: user
        })

    }catch (error){
        next(error)
    }
}



    export const updateUsers = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const { name, email, role,  AreyouanAuthor } = req.body;
        const updateUsers = await userModel.findByIdAndUpdate(
            id,
            { name, email, role,  AreyouanAuthor },
            { new: true }
        )
        return res.status(200).json({
            message: "User updated successfully",
            data: updateUsers
        })

    }catch (error){
        next(error)
    }
}

export const deleteUser = async(
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try{
        const { id } = req.params
        const deleteUser = await userModel.findByIdAndDelete(id)
        if(!deleteUser){
            throw new AppError("user not found", 404)
        }
        return res.status(200).json({
            message: "user deleted successfully",
            data: deleteUser
        })

    }catch(error){
        next(error)
    }
}