import express from "express"
import { validateToken } from "../utils/verifiyedUser.js"
import {
  generateComment,
  getPostComment,
  likeComment,
  editComment,
  deleteComment,
  getComments,
} from "../controllers/blog_comment_controller.js"

const router = express.Router()

router.post("/generate", validateToken, generateComment)
router.get("/getPostComment/:postId", getPostComment)
router.put("/likeComment/:commentId", validateToken, likeComment)
router.put("/editComment/:commentId", validateToken, editComment)
router.delete("/deleteComment/:commentId", validateToken, deleteComment)
router.get("/getComments", validateToken, getComments)

export default router
