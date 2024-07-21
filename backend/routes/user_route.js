// Import the Express framework
import express from "express"
// Import the 'test' function from the user controller
import {
  signOut,
  test,
  updateUser,
  removeUser,
  loadUsers,
  getUser,
} from "../controllers/user_controller.js"
import { validateToken } from "../utils/verifiyedUser.js"
// Create a new Express router instance
const router = express.Router()

// Define a GET route at "/test" that calls the 'test' function from the user controller
router.get("/test", test)
router.put("/update/:userId", validateToken, updateUser)
router.delete("/delete/:userId", validateToken, removeUser)
router.post("/signout", signOut)
router.get("/loadmembers", validateToken, loadUsers)
router.get("/:userId", getUser)

// Export the router for use in other parts of the application
export default router
