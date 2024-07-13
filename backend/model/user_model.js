// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose"

// Define a schema for the User model with fields for username, email, and password
// The 'timestamps' option adds 'createdAt' and 'updatedAt' fields automatically
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // The username field is a string
      required: true, // The username field is required
      unique: true, // The username field must be unique
    },
    email: {
      type: String, // The email field is a string
      required: true, // The email field is required
      unique: true, // The email field must be unique
    },
    password: {
      type: String, // The password field is a string
      required: true, // The password field is required
    },
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt fields
)

// Create a Mongoose model named 'User' using the userSchema
const User = mongoose.model("user", userSchema)

// Export the User model for use in other parts of the application
export default User
