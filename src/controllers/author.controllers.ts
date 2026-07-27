import type { Request, Response, NextFunction } from "express"
import authorModel from "../model/author.model.js";
import AppError from "../utils/AppError.js"
import bcrypt from "bcrypt"
import cloudinary from '../configuration/cloudinary.js';
import { getAll } from "./book.controllers.js";
import { sendWelcomeEmail } from "../../services/Email.services.js";


export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction,
)=>{
    try {
        const {name, bio, email, password, image } = req.body;

        const findExistingAuthor = await authorModel.findOne({ email })

        if(findExistingAuthor){
            throw new AppError ("author already exist", 400)
        }
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash ( password, genSalt)

        const newAuthor = await authorModel.create ({
             name,
            bio,
            email,
            password : hashedPassword,
    
        });
        return res.status(201).json({
            message: "Author created successfully",
            data: newAuthor,
        })
    } catch (error){
        next(error)
    }
};

export const signin = async(
    req: Request,
    res:Response,
    next: NextFunction
)=>{
    try {
        const { Email, Password } = req.body;
        const author = await authorModel.findOne({ Email })
         
        if (!author){
            throw new AppError("Invalid Credentials", 401)

        }
        const comparePassword = await bcrypt.compare(Password, author.password)
        if (!comparePassword){
            throw new AppError("invalid password",400)
        }
        return res.status(200).json({
            message:"Author successfully signed in",
            data: author,

        })

    }catch(error){
        next(error)
    }
}

export const Register = async (
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try {
        const { name, email, password} = req.body
        const findExistingAuthor = await authorModel.findOne({ email })
 
        if (findExistingAuthor){
            throw new AppError(" Author already exist", 409) 
        }
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)

        const RegisteredAuthor = await authorModel.create({
            name,
            email, 
            password: hashedPassword 
        
        });
          await sendWelcomeEmail(email, name)

    return res.status(201).json({
        message: "successfully registered",
        data: RegisteredAuthor,
        id: RegisteredAuthor?._id
    })
    }catch(error){
        next(error)
    }
}













export const updateAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const { id } = req.params
        const { Bio, image } = req.body

         if(!req.file){
            throw new AppError("image is required", 400);
        }

         const result = await cloudinary.uploader.upload(req.file.path);
         
        const updatedAuthor = await authorModel.findByIdAndUpdate(
            id,
            { Bio, image: {
                url: result.secure_url,
                public_id: result.public_id
            },  },
            { new: true }
        )
        if (!updatedAuthor){
            throw new AppError("update required", 400)
        }
        
        return res.status(200).json({
            message:"Update successfully done",
            data: updatedAuthor,
        })

    }catch(error){
        next(error)
    }
}

// export const getOneAuthor = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=> {
//     try {
//         const { id } = req.params
//         const getOne = await authorModel.findById(id).populate ({
//             path: "Books"
//         })
//         if (!getOne){
//             throw new AppError ("One author must be gotten", 409)
//         }
//         return res.status(200).json({
//             message: "one author Retrived",
//             data: getOne
//         })
//     }catch (error){
//         next (error)
//     }
// }



export const getOneAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        const { id } = req.params
        const getOne = await authorModel.findById(id).populate ({
            path: "Books"
        })
        if (!getOne){
            throw new AppError ("One author must be gotten", 409)
        }
        return res.status(200).json({
            message: "one author Retrived",
            data: getOne
        })
    }catch (error){
        next (error)
    }
}


export const getAllAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const getAll = await authorModel.find()
        return res.status(200).json({
            message: "All authors retrived",
            data: getAll
        })

    }catch(error){
        return res.status(500).json({
            message: " Could not get all authors",
            error,
        })
    }
}

