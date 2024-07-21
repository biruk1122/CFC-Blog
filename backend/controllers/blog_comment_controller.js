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

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId)
    if (!comment) {
      return next(errorHandler(404, "Comment can not be found"))
    }
    if (comment.userId !== req.user.id && !req.user.administrator) {
      return next(
        errorHandler(403, "you are not authorized to edit this comment")
      )
    }
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    )
    res.status(200).json(editedComment)
  } catch (error) {
    next(error)
  }
}

export const deleteComment = async (req, res, next) => {
  console.log("deleteComment called")
  try {
    const commentId = req.params.commentId
    console.log("Deleting comment with ID:", commentId)

    const comment = await Comment.findById(commentId)
    console.log("Found comment:", comment)

    if (!comment) {
      console.log("Comment not found")
      return next(errorHandler(404, "Comment not found"))
    }

    const userId = req.user.id
    const isAdmin = req.user.administrator
    console.log("Current user ID:", userId)
    console.log("Is admin:", isAdmin)

    if (comment.userId !== userId && !isAdmin) {
      console.log("User not authorized to delete this comment")
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      )
    }

    await Comment.findByIdAndDelete(commentId)
    console.log("Comment deleted successfully")

    res.status(200).json("Comment has been deleted")
  } catch (error) {
    console.error("Error deleting comment:", error)
    next(error)
  }
}

export const getComments = async (req, res, next) => {
  if (!req.user.administrator)
    return next(errorHandler(403, "you are not allowed to get all comments"))
  try {
    const indexStart = parseInt(req.query.indexStart) || 0
    const maxItems = parseInt(req.query.maxItems) || 9
    const sortOrder = req.query.sort === "desc" ? -1 : 1
    const comments = await Comment.find()
      .sort({ createdAt: sortOrder })
      .skip(indexStart)
      .limit(maxItems)
    const totalComments = await Comment.countDocuments()
    const now = new Date()
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: lastMonth },
    })
    res.status(200).json({ comments, totalComments, lastMonthComments })
  } catch (error) {
    next(error)
  }
}
