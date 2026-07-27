 import {model, Schema, Document } from "mongoose";
 import mongoose from "mongoose"

interface author {
    name: string;
    bio: string;
    book: mongoose.Types.ObjectId[],
    email: string;
    password: string;
    image: {
        url: string;
        public_id: string;
    };
}

interface iauthor extends author, Document{}

const authorSchema: Schema<iauthor> = new Schema({
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
        public_id : String
    },
})

const authorModel = model<iauthor>("author", authorSchema)
export default authorModel 