import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user_route.js"
import cookieParser from "cookie-parser"

dotenv.config()

mongoose
  .connect(process.env.MONGO_HIDE)
  .then(() => {
    console.log("The MongoDB database is connected.") // Log a message when connected to MongoDB
  })
  .catch((error) => {
    console.log(error) // Log any connection errors
  })

const app = express()

app.use(cookieParser())

app.listen(3000, () => {
  console.log("Server operational at port 3000!!!") // Log a message when the server starts
})

app.use("/api/user", userRoutes)
