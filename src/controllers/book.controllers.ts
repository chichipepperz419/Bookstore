import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import bookModel from "../model/book.model.js";
import cloudinary from "../configuration/cloudinary.js";
import authorModel from "../model/author.model.js";
import { updateAuthor } from "./author.controllers.js";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorsId } = req.params;
    const { BookTitle, Author, price, coverimage, category, status } = req.body;

    const existingBook = await bookModel.findOne({ BookTitle });
    if (existingBook) {
      throw new AppError("Book already exist", 400);
    }
    if (!req.file) {
      throw new AppError("image is required", 400);
    }
    //find the author
    const author = await authorModel.findById(authorsId);

    
    if (!author) {
      throw new AppError("Author not found", 400);
    }

    //upload image
    const result = await cloudinary.uploader.upload(req.file.path);

    const newbooks = await bookModel.create({
      BookTitle,
      Author: author._id,
      price,
      coverimage: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      category,
      status,
    });

    await author.book.push(newbooks._id);
    await author.save();
    return res.status(201).json({
      message: "Book created successfully",
      data: newbooks,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (!book) {
      throw new AppError("book not found", 404);
    }
    return res.status(200).json({
      message: "book found",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedStatus = await bookModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!updatedStatus) {
      throw new AppError("Book not in stock", 400);
    }
    return res.status(200).json({
      message: "Book Status updated successfully",
      data: updatedStatus,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getAllBooks = await bookModel.find();
    return res.status(200).json({
      message: "All books Retrived",
      data: getAllBooks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not all books are Retrived",
      error,
    });
  }
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const user = await bookModel.find({
      name: { $regex: search, $options: "i" },
    });
    return res.status(200).json({
      message: "user gotten",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error,
    });
  }
};
