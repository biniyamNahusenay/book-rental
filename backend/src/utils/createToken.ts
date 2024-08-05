import jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateToken = (res: Response, userId: number): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true, //prevent xss cross site scripting
    secure: process.env.NODE_ENV !== "development",// it is HTTP but in deployment.. HTTPS
    sameSite: "strict",//prevent csrf attack cross-site request forgery
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
}

export default generateToken;