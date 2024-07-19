import express from "express"
import { validateToken } from "../utils/verifiyedUser.js"
import {
  generate,
  loadPost,
  removePost,
  editPost,
} from "../controllers/blog_post_controller.js"

const pathFinder = express.Router()

pathFinder.post("/generate", validateToken, generate)
pathFinder.get("/loadPost", loadPost)
pathFinder.delete("/removepost/:postId/:userId", validateToken, removePost)
pathFinder.put("/updatepost/:postId/:userId", validateToken, editPost)

export default pathFinder
