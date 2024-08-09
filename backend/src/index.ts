import express from "express"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute.js"
import bookRoutes from "./routes/bookRoutes.js"
import rentalRoute from "./routes/rentalRoute.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
// import path from 'path'
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())
const PORT = process.env.PORT || 3000

app.use("/api/user",userRoute)
app.use("/api/books",bookRoutes)
app.use('/api/rentals',rentalRoute)

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
})