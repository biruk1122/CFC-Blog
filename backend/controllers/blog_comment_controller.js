import Comment from "../model/blog_comment_model.js"
import { errorHandler } from "../utils/error.js"

export const generateComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body

    //console.log("Generating comment...")

    //console.log("Received content:", content)
    //console.log("Received postId:", postId)
    //console.log("Received userId:", userId)

    if (userId !== req.user.id) {
      console.error("User ID does not match authenticated user ID.")
      return next(
        errorHandler(403, "you are not allowed to create this comment")
      )
    }
    const newBlogComment = new Comment({
      content,
      postId,
      userId,
    })
    // console.log("Saving newBlogComment:", newBlogComment)
    await newBlogComment.save()

    // console.log("Comment saved successfully:", newBlogComment)

    res.status(200).json(newBlogComment)
  } catch (error) {
    //console.error("Error in generateComment:", error)
    next(error)
  }
}
