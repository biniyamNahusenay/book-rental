import { Request, Response } from 'express';
import Prisma from '../db/prisma.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export const rentBook = asyncHandler(async(req,res)=>{
    try {
        const bookId = parseInt(req.params.id,10)
        const userId = (req as any).user.id

        const book = await Prisma.book.findUnique({where:{id:bookId}})
        if(!book){
            return res.status(404).json({message:"Book not found"})
        }
        if(book.quantity <= 0){
            return res.status(400).json({message:"Book is currently unavailable for rent"})
        }
        const newRental = await Prisma.rental.create({
            data:{
                bookId:book.id,
                renterId:userId,
                status: 'Rented'
            }
        })
        const updatedBook = await Prisma.book.update({
            where:{id:bookId},
            data:{
                quantity:book.quantity - 1,
                availabilityStatus:book.quantity - 1 === 0 ? 'rented' : 'available'
            }
        })

        await Prisma.revenue.create({
            data: {
              amount: book.price,
              bookId: book.id,
              ownerId: book.ownerId,
            }
          });
          
        res.status(200).json({ message: 'Book rented successfully', newRental, updatedBook })
    } catch (error) {
       res.status(500).json({ message: 'Server error', error });
    }
})