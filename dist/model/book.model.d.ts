import { Document, Types } from "mongoose";
import mongoose from "mongoose";
interface Books {
    BookTitle: string;
    Author: Types.ObjectId;
    price: number;
    coverimage: {
        url: string;
        public_id: string;
    };
    category: string;
    status: string;
}
interface Ibooks extends Books, Document {
}
declare const bookModel: mongoose.Model<Ibooks, {}, {}, {}, Document<unknown, {}, Ibooks, {}, mongoose.DefaultSchemaOptions> & Ibooks & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Ibooks>;
export default bookModel;
//# sourceMappingURL=book.model.d.ts.map