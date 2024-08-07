import express from "express"
import { loginUser, logoutUser, registerUser,getAllUsers,approveOwner} from "../controllers/userController.js"
import authenticate from "../middlewares/authMiddleware.js"
import authorizeUser from "../middlewares/authorizeMiddleware.js" 

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/allUsers",getAllUsers)  // 
router.patch('/approve-owner/:id',authenticate,authorizeUser("manage","all") , approveOwner)

export default router