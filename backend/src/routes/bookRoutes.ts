import express from 'express'
import { createBook, deleteBook, editBook } from '../controllers/bookController.js'

const router = express.Router()

router.post("/upload",createBook) //authorization later i.e the owner
router.put("/edit/:id",editBook)  //authorization later i.e the owner
router.delete("/delete/:id",deleteBook) //authorization later i.e the owner
// router.get("/allbooks",getAllBooks)

export default router