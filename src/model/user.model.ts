import mongoose, { Document } from "mongoose";

interface user {
    name: string;
    email: string;
    password: string;
    verificationToken: string;
    verificationExpired: Date;
    passwordResetToken: string;
    passwordResetExpired: Date;

}
interface Iuser extends user, Document {}

const userSchema = new mongoose.Schema<Iuser>({
    name: { 
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true,
    },
    verificationToken: { 
        type: String
    },
    verificationExpired: { 
        type: Date
    },
    passwordResetToken: { 
        type: String
    },
    passwordResetExpired: { 
        type: Date
    }
})
const userModel = mongoose.model<Iuser>("User", userSchema);
export default userModel;