import express from "express"
import { signup } from "../controllers/authentication_controller.js"

// Create a new Express router instance
const router = express.Router()

// Define a POST route at "/signup" that calls the signup function from the authentication controller
router.post("/signup", signup)

// Export the router for use in other parts of the application
export default router
