import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Field to attach the error message
  });

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
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