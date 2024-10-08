import express from "express"
import { loginUser, logoutUser, registerUser,getAllUsers,
    approveOwner, getOwnerRevenue, disableUser,filterBooks,filterBooksByLocation,getOwner,deleteUser} from "../controllers/userController.js"
import authenticate from "../middlewares/authMiddleware.js"
import authorizeUser from "../middlewares/authorizeMiddleware.js" 

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/allUsers",getAllUsers)  // 
router.patch('/approve-owner/:id',authenticate,authorizeUser("manage","all") , approveOwner)
router.get("/owners/revenue",authenticate,authorizeUser("read","Revenue"),getOwnerRevenue)
router.patch("/owner/:id/disable",authenticate,authorizeUser("disable","User"),disableUser)
router.get("/books/filter",authenticate,filterBooks)
router.get('/books/location', authenticate, filterBooksByLocation);
router.get("/owners/:id",authenticate,authorizeUser("manage","all"),getOwner)
router.delete("/delete/:id",authenticate,authorizeUser("manage","all"),deleteUser)

export default router