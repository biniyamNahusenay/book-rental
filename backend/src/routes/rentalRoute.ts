import express from "express"
import authenticate from "../middlewares/authMiddleware.js"
import authorizeUser from "../middlewares/authorizeMiddleware.js"
import { rentBook } from "../controllers/rentalController.js"

const router = express.Router()

router.post('/book/:id/rent',authenticate,authorizeUser('rent','Book'),rentBook)

export default router