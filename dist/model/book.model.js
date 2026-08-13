import { model, Schema, Document, Types } from "mongoose";
import mongoose from "mongoose";
const BookSchema = new Schema({
    BookTitle: {
        type: String,
        required: true,
        unique: true,
    },
    Author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    coverimage: {
        url: String,
        public_id: String
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
});
const bookModel = model("Books", BookSchema);
export default bookModel;
//# sourceMappingURL=book.model.js.map