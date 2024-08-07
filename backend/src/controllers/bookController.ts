import { Request, Response } from 'express';
import Prisma from '../db/prisma.js';
import { z } from 'zod';
import asyncHandler from '../middlewares/asyncHandler.js';

const bookSchema = z.object({
    title: z.string(),
  author: z.string(),
  category: z.array(z.string()),
  quantity: z.string().transform((val) => parseInt(val, 10)), // Expecting an integer directly
  image:  z.array(z.string()), // Ensure it's a valid URL
  price: z.string().transform((val) => parseFloat(val)), // Expecting a number directly
  ownerId: z.string().transform((val) => parseInt(val, 10)), // Expecting an integer directly
  });

export const createBook = asyncHandler(async(req:Request,res:Response )=>{
    try {
        // Validate request body
        const result = bookSchema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json(result.error.errors);
        }
    
        const { title, author, category, quantity, image, price, ownerId } = result.data;
        const owner = await Prisma.user.findUnique({ where: { id: ownerId } });
        if(!owner || !owner.approved){
          return res.status(403).json({ message: 'Owner is not approved' });
        }
    
        const newBook = await Prisma.book.create({
          data: {
            title,
            author,
            category,
            quantity, // Already an integer
            image: image, // Ensure image is an array
            price, // Already a float
            ownerId // Already an integer
          },
        });
    
        res.status(201).json({ message: 'Book uploaded successfully', newBook });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error });
      }
})

export const editBook = asyncHandler(async(req:Request,res:Response)=>{
    try {
        const bookId = parseInt(req.params.id, 10);
        const result = bookSchema.safeParse(req.body);
     if (!result.success) {
        return res.status(400).json(result.error.errors);
      } 
      const updateData = result.data;

    // Update the book
    const updatedBook = await Prisma.book.update({
      where: { id: bookId },
      data: updateData,
    });

    res.status(200).json({ message: 'Book updated successfully', updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });  
    }
    
})

export const deleteBook = asyncHandler(async(req:Request,res:Response)=>{
  try {
    const bookId = parseInt(req.params.id, 10);
      // Delete the book
      await Prisma.book.delete({
        where: { id: bookId },
      });
  
      res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})

// Controller to get all books
  
export const getAllUploadedBooks = asyncHandler(async(req:Request,res:Response)=>{
   try {
      const books = await Prisma.book.findMany()
      res.status(200).json({books})
   } catch (error) {
     res.status(500).json({message:"server error"})
   }
})