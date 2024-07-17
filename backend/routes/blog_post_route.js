import express from "express"
import { validateToken } from "../utils/verifiyedUser.js"
import { generate, loadPost } from "../controllers/blog_post_controller.js"

const pathFinder = express.Router()

pathFinder.post("/generate", validateToken, generate)
pathFinder.get("/loadPost", loadPost)

export default pathFinder
