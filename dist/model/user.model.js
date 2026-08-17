import mongoose, { Document } from "mongoose";
const userSchema = new mongoose.Schema({
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
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
//# sourceMappingURL=user.model.js.map