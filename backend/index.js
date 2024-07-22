// Import the Express framework to create the server
import express from "express"
// Import Mongoose for MongoDB database connection
import mongoose from "mongoose"
// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv"
// Import user routes for handling user-related API endpoints
import userRoutes from "./routes/user_route.js"
import blogCommentRoutes from "./routes/blog_comment_route.js"
// Import authentication routes for handling authentication-related API endpoints
import authenticationRoutes from "./routes/authentication_route.js"
import cookieParser from "cookie-parser"
import postRoutes from "./routes/blog_post_route.js"
import path from "path"

// Load environment variables from .env file
dotenv.config()

// Connect to MongoDB Atlas server using Mongoose with the connection string from environment variables
mongoose
  .connect(process.env.MONGO_HIDE)
  .then(() => {
    console.log("The MongoDB database is connected.") // Log a message when connected to MongoDB
  })
  .catch((error) => {
    console.log(error) // Log any connection errors
  })

const __dirname = path.resolve()

// Create an Express application
const app = express()

// Middleware to parse JSON request bodies
app.use(express.json())
app.use(cookieParser())

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server operational at port 3000!!!") // Log a message when the server starts
})

// Use the userRoutes for handling requests to /api/user
app.use("/api/user", userRoutes)
// Use the authenticationRoutes for handling requests to /api/authentication
app.use("/api/authentication", authenticationRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comment", blogCommentRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500 // Default to 500 if no status code is provided
  const message = err.message || "Internal Server Error" // Default to generic error message
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
