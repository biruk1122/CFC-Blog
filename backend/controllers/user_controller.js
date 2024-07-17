import User from "../model/user_model.js"

export const test = (req, res) => {
  res.json({ message: "API is Working" })
  export const updateUser = async (req, res, next) => {
    try {
      // Log the values of req.user.id and req.params.userId
      //console.log("req.user.id:", req.user.id)
      //console.log("req.params.userId:", req.params.userId)
  
      // Check if the authenticated user is the owner of the profile being updated
      if (req.user.id !== req.params.userId) {
        return next(
          errorHandler(403, "You are not allowed to update this profile")
        )
      }
  
      // Validate and hash password if provided
      if (req.body.password) {
        if (req.body.password.length < 8) {
          return next(
            errorHandler(400, "Password must be at least 8 characters long")
          )
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
      }
  
      // Validate username if provided
      if (req.body.username) {
        if (req.body.username.length < 6 || req.body.username.length > 15) {
          return next(
            errorHandler(400, "Username must be between 6 and 15 characters")
          )
        }
        if (req.body.username.includes(" ")) {
          return next(errorHandler(400, "Username cannot contain spaces"))
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
          return next(errorHandler(400, "Username must be lowercase"))
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
          return next(
            errorHandler(400, "Username can only contain letters and numbers")
          )
        }
      }
  
      // Update user in the database
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar,
            password: req.body.password,
          },
        },
        { new: true }

        export const removeUser = async (req, res, next) => {
          if (!req.user.administrator && req.user.id !== req.params.userId) {
            return next(
              errorHandler(403, "You do not have permission to delete this user.")
            )
          }
          try {
            await User.findByIdAndDelete(req.params.userId)
            res.status(200).json("The user has been successfully deleted.")
          } catch (error) {
            next(error)
          }
        }
      )
}
