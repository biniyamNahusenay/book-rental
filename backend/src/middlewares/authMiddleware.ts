import jwt, { JwtPayload } from 'jsonwebtoken';
import Prisma from "../db/prisma.js"
import { Request,Response,NextFunction } from "express"
import asyncHandler from "./asyncHandler.js"

interface CustomJwtPayload extends JwtPayload {
    userId: number;
  }

const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    let token;
    //read jwt from the 'jwt' cookie
    token = req.cookies.jwt
    if(token){
      try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as CustomJwtPayload;
        const user = await Prisma.user.findUnique({ where: { id: decoded.userId } });

        if (!user) {
          return res.status(401).json({ message: 'Invalid token, authorization denied' });
        }
        (req as any).user = user;
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }else{
      res.status(401);
      throw new Error("no token");
    }
})

export default authenticate;