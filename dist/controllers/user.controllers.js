import AppError from "../utils/AppError.js";
import { generateToken } from "../utils/token.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const findExistingUser = await userModel.find(email);
        if (findExistingUser) {
            throw new AppError("User already exist", 400);
        }
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user.controllers.js.map