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
interface Iuser extends user, Document {
}
declare const userModel: mongoose.Model<Iuser, {}, {}, {}, Document<unknown, {}, Iuser, {}, mongoose.DefaultSchemaOptions> & Iuser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Iuser>;
export default userModel;
//# sourceMappingURL=user.model.d.ts.map