import { model, Schema, Document } from "mongoose";
import mongoose from "mongoose";
const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    book: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books",
        },
    ],
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        public_id: String
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpired: {
        type: Date,
    },
});
const authorModel = model("author", authorSchema);
export default authorModel;
//# sourceMappingURL=author.model.js.map