import express from 'express'
import { createBook, deleteBook, editBook, 
 getAllUploadedBooks,getOwnersBook,getSingleBook,getBooksStatisticsByCategory } from '../controllers/bookController.js'
import authenticate from '../middlewares/authMiddleware.js'
import authorizeUser from '../middlewares/authorizeMiddleware.js'

const router = express.Router()

router.post("/upload",createBook)
router.put("/edit/:id",authenticate,authorizeUser('update','Book'),editBook)
router.delete("/delete/:id",authenticate,authorizeUser("delete","Book"),deleteBook)
router.get("/allbooks",authenticate,authorizeUser("manage","all"),getAllUploadedBooks)
router.get("/allOwnerbooks",authenticate,authorizeUser("read","Book"),getOwnersBook)
router.get("/book/:id",authenticate,getSingleBook)
router.get('/statistics/books-by-category', authenticate,getBooksStatisticsByCategory)

export default router