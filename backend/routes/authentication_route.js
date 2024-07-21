// Import the Express framework
import express from "express"
// Import the signup function from the authentication controller
import {
  google,
  signup,
  signin,
} from "../controllers/authentication_controller.js"

// Create a new Express router instance
const router = express.Router()

// Define a POST route at "/signup" that calls the signup function from the authentication controller
router.post("/signup", signup)
// Define a POST route at "/signin" that calls the signin function from the authentication controller
router.post("/signin", signin)
// Define a POST route for handling Google authentication, using the 'google' controller function
router.post("/google", google)

// Export the router for use in other parts of the application
export default router
