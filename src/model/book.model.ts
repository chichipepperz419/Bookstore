import { model, Schema, Document, Types  } from "mongoose";
import mongoose from "mongoose"


interface Books {
    BookTitle: string,
    Author: Types.ObjectId;
    price: number,
   coverimage: {
        url: string,
        public_id : string
    },
    category: string,
    status: string,
    //default: string
}

interface Ibooks extends Books, Document{}

const BookSchema: Schema<Ibooks> = new Schema({
    
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
        public_id : String
    },

    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,

    },

})
const bookModel = model <Ibooks>("Books", BookSchema)
export default bookModel
