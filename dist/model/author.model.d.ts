import { Document } from "mongoose";
import mongoose from "mongoose";
interface author {
    name: string;
    bio: string;
    book: mongoose.Types.ObjectId[];
    email: string;
    password: string;
    image: {
        url: string;
        public_id: string;
    };
    verificationToken: string;
    verificationExpired: Date;
    passwordResetToken: string;
    passwordResetExpired: Date;
}
interface iauthor extends author, Document {
}
declare const authorModel: mongoose.Model<iauthor, {}, {}, {}, Document<unknown, {}, iauthor, {}, mongoose.DefaultSchemaOptions> & iauthor & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, iauthor>;
export default authorModel;
//# sourceMappingURL=author.model.d.ts.map