import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js"

export const validateToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return next(errorHandler(401, "You are unauthorized user"))
  }
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, user) => {
    if (error) {
      return next(errorHandler(401, "You are unauthorized user"))
    }

    req.user = user

    // Ensure req.user.id is set correctly
    req.user.id = user.userId

    next()
  })
}
