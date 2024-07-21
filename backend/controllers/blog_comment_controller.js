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

export const getPostComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    })
    res.status(200).json(comments)
  } catch (error) {}
}

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId)
    if (!comment) {
      return next(errorHandler(404, "Comment not found"))
    }
    const userIndex = comment.likes.indexOf(req.user.id)
    if (userIndex === -1) {
      comment.numberOfLikes += 1
      comment.likes.push(req.user.id)
    } else {
      comment.numberOfLikes -= 1
      comment.likes.splice(userIndex, 1)
    }
    await comment.save()
    res.status(200).json(comment)
  } catch (error) {
    next(error)
  }
}
