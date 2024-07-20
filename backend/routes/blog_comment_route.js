import express from "express"
import { validateToken } from "../utils/verifiyedUser.js"
import { generateComment } from "../controllers/blog_comment_controller.js"

const router = express.Router()

router.post("/generate", validateToken, generateComment)

export default router
