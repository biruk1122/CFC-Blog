// Import the User model from the model directory
import User from "../model/user_model.js"

// Import bcryptjs for password hashing
import bcryptjs from "bcryptjs"

// Import a custom error handler utility
import { errorHandler } from "../utils/error.js"

// Import jsonwebtoken for creating JWT tokens
import jwt from "jsonwebtoken"

// Log the request body to the console
export const signup = async (req, res, next) => {
  // Destructure username, email, and password from the request body
  const { username, email, password } = req.body

  // Check if there is no user name, password or email any required fields are missing or empty
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields required")) //Call the Custom error handler if validation fails
  }
  // Validate the password field
  if (typeof password !== "string") {
    // Call the custom error handler if password validation fails
    return next(errorHandler(400, "password must be a string"))
  }

  // Hash the password using bcryptjs
  const hashpassword = bcryptjs.hashSync(password, 10)

  // Create a new user instance with the provided data, including the hashed password
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  })

  try {
    // Save the new user to the database
    await newUser.save()

    // Send a success response
    res.json("Signup Successful")
  } catch (error) {
    // Handle any errors that occur during the save process
    next(error)
  }
}

// Define and export an asynchronous function named 'signin' to handle user signin requests
export const signin = async (req, res, next) => {
  // Destructure email and password from the request body
  const { email, password } = req.body

  // Check if any required fields are missing or empty
  if (!email || !password || email === "" || password === "") {
    // Call the custom error handler if validation fails
    return next(errorHandler(400, "All fields are required"))
  }
}

try {
  // Find the user by email
  const verifyUser = await User.findOne({ email })

  // If user not found, call the custom error handler
  if (!verifyUser) {
    return next(errorHandler(404, "User not found"))
  }
  // Verify the provided password with the stored hashed password
  const verifyPassword = bcryptjs.compareSync(password, verifyUser.password)

  // If password is invalid, call the custom error handler
  if (!verifyPassword) {
    return next(errorHandler(400, "Invalid Password"))
  }
  // Create a JWT token with the user's ID and a private key from environment variables
  const authCredential = jwt.sign(
    { userId: verifyUser._id, administrator: verifyUser.administrator },
    process.env.JWT_PRIVATE_KEY
  )

  // Destructure and exclude the password field from the user object
  const { password: pin, ...rest } = verifyUser._doc

  // Set a cookie with the JWT token and send the response with user data
  res
    .status(200)
    .cookie("access_token", authCredential, {
      httpOnly: true,
    })
    .json(rest)
} catch (error) {
  // Handle any errors that occur during the signin process
  next(error)
}
