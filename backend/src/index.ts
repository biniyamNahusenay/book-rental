import express from "express"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser"

dotenv.config();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const PORT = process.env.PORT || 5000

app.use("/api/user",userRoute)

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
})