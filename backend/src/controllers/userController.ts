import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import Prisma from '../db/prisma.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import createToken from "../utils/createToken.js"

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    role: z.enum(['Admin', 'Owner', 'Renter']).optional(),
    phoneNumber: z.string().optional(),
    location: z.string().optional(),
    terms: z
    .boolean().default(false)
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Field to attach the error message
  });

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    remember: z.boolean().default(false)
  });

export const registerUser = asyncHandler(async(req:Request,res:Response)=>{
   try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error.errors);
    }

    const { email, password, role, phoneNumber, location } = result.data;
    const userExists = await Prisma.user.findUnique({where:{email}})
     if(userExists) res.status(400).send("user already exist")
     //hash the password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password,salt)
     //creating a user now
     const newUser = await Prisma.user.create({
        data:{
            email,
            password: hashedPassword,
            role,
            PhoneNumber: phoneNumber ?? null, // Handle optional field
            location: location ?? null,    
        }
     })
     createToken(res,newUser.id)
     res.status(201).json({ message: 'User registered successfully', newUser });

   } catch (error) {
    res.status(400)
    throw new Error("invalid user data")
   }
})

export const loginUser = asyncHandler(async(req:Request,res:Response)=>{
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json(result.error.errors);
        }
     const { email, password } = result.data;
     const user = await Prisma.user.findUnique({where:{email}})
     if(user){
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(isPasswordValid){
         createToken(res,user.id)
         res.status(201).json({message:"logged in success",user})
        }else{
            res.status(201).json({message:"invalid password"})
        }
     }else{
        res.status(401).json({message:"user not found"})
      }
    } catch (error) {
      res.status(400)
      throw new Error("invalid user data")
    }
})

export const logoutUser = asyncHandler(async(req:Request,res:Response)=>{
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
})

export const getAllUsers = asyncHandler(async(req:Request,res:Response)=>{
  try {
    // Fetch all users from the database
    const users = await Prisma.user.findMany();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error});
  }

})
 //creating a controller function that updates the 'approved' status of an owner
export const approveOwner = asyncHandler(async(req:Request,res:Response)=>{
   try {
     const ownerId = parseInt(req.params.id,10)
     const owner = await Prisma.user.findUnique({where:{id:ownerId}})
     if(!owner){
       return res.status(404).json({message:"owner not found"})
     }
     //update the owners approval status
     const updatedOwner = await Prisma.user.update({
       where:{id:ownerId},
       data:{approved:true}
     })
     res.status(200).json({message:'Owner approved successfully',updatedOwner})
   } catch (error) {
     res.status(500).json({message:"server error",error})
   }
})

export const getOwnerRevenue = asyncHandler(async(req:Request,res:Response)=>{
  try {
    const ownerId = (req as any).user?.id
    const revenues = await Prisma.revenue.findMany({
      where:{ownerId:ownerId}
    })
    const totalRevenue = revenues.reduce((total,revenue)=>total + revenue.amount,0)
    res.status(200).json({ revenue: totalRevenue });
  } catch (error) {
     res.status(500).json({ message: 'Server error', error });
  }
})

export const disableUser = asyncHandler(async(req:Request,res:Response)=>{
  try {
    const ownerId = parseInt(req.params.id,10)
    const owner = await Prisma.user.findUnique({where:{id:ownerId}})
    if(!owner){
      return res.status(404).json({message:"owner not found"})
    }

    const disabledOwner = await Prisma.user.update({
      where:{id:ownerId},
      data:{active:false}
    })

     res.status(200).json({ message: 'Owner disabled successfully', disabledOwner });
  } catch (error) {
     res.status(500).json({ message: 'Server error', error });
  }
})

export const filterBooks = asyncHandler(async(req:Request,res:Response)=>{
  try {
     const {category,author,ownerId,limit} = req.query
     const filters : any = {}
     if(category) filters.category = {has:category as string} // cause category is an array
     if(author) filters.author = author as string
     if(ownerId) filters.ownerId = parseInt(ownerId as string,10)
      const books = await Prisma.book.findMany({
        where:filters,
        take:limit ? parseInt(limit as string,10) : undefined       
      })
      res.status(200).json({books});
  } catch (error) {
     res.status(500).json({ message: 'Server error', error });
  }
})

export const filterBooksByLocation = asyncHandler(async(req:Request,res:Response)=>{
   try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ message: 'Location parameter is required' });
    }

    const books = await Prisma.book.findMany({
      where:{
        owner:{
          location:location as string
        },
      },
      include:{
        owner:true
      }
    })

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})