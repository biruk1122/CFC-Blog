// Import the User model from the model directory
import User from "../model/user_model.js"

// Import bcryptjs for password hashing
import bcryptjs from "bcryptjs"

// Import a custom error handler utility
import { errorHandler } from "../utils/error.js"

// Import jsonwebtoken for creating JWT tokens
import jwt from "jsonwebtoken"

// Define and export an asynchronous function named 'signup' to handle user signup requests
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
}

// Define an asynchronous function called google to handle Google OAuth authentication
export const google = async (req, res, next) => {
  // Destructure email, name, and googlePhotoUrl from the request body
  const { email, name, googlePhotoUrl } = req.body
  try {
    // Try to find a user in the database with the given email
    const userInfo = await User.findOne({ email })

    // If the user exists
    if (userInfo) {
      // Create a JWT token with the user's ID
      const authToken = jwt.sign(
        { userId: userInfo._id, administrator: userInfo.administrator },
        process.env.JWT_PRIVATE_KEY
      )
      // Destructure the password field out of the userInfo object and keep the rest
      const { password, ...rest } = userInfo._doc
      // Send a 200 status response, set an HTTP-only cookie with the JWT token, and return the user info without the password
      // console.log("google sign in data", rest)
      res
        .status(200)
        .cookie("access_token", authToken, {
          httpOnly: true,
        })
        .json(rest)
    } else {
      // If the user does not exist, generate a random password
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      // Hash the random password
      const hashedPassword = bcryptjs.hashSync(randomPassword, 10)
      // Create a new user with the provided details and hashed password
      const createdUser = new User({
        // Generate a username by converting the name to lowercase, splitting it into characters, joining them without spaces,
        // and appending a random 4-digit number
        username:
          name.toLowerCase().split("").join("") +
          Math.random().toString(9).slice(-4),
        // Assign the email provided in the request body
        email,
        // Assign the hashed password generated earlier
        password: hashedPassword,
        // Assign the Google profile photo URL provided in the request body
        avatar: googlePhotoUrl,
      })
      // Save the newly created user to the database
      await createdUser.save()
      // Create a JWT token with the new user's ID
      const token = jwt.sign(
        { userId: createdUser._id, administrator: createdUser.administrator },
        process.env.JWT_PRIVATE_KEY
      )
      // Destructure the password field out of the createdUser object and keep the rest
      const { password, ...rest } = createdUser._doc

      // Send a 200 status response, set an HTTP-only cookie with the JWT token, and return the new user info without the password

      res
        .status(200)
        // Set a cookie named "access_token" with the JWT token
        .cookie("access_token", token, {
          // Ensure the cookie is only accessible via HTTP (not JavaScript), enhancing security
          httpOnly: true,
        })
        // Send a JSON response containing the rest of the user information (excluding the password)
        .json(rest)
    }
  } catch (error) {
    // If there is an error, pass it to the next middleware function

    next(error)
  }
}
