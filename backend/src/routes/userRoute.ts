import express from "express"
import { loginUser, logoutUser, registerUser,getAllUsers } from "../controllers/userController.js"
 
const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/allUsers",getAllUsers)  // need an authorization

export default router