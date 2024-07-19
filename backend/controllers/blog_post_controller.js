import blog from "../model/blog_post_model.js"

export const generate = async (req, res, next) => {
  if (!req.user.administrator) {
    return next(errorHandler(403, "you dont have permission to create a post"))
  }
  if (!req.body.subject || !req.body.content) {
    return next(errorHandler(400, "Kindly fill in all the necessary fields."))
  }
  const permalink = req.body.subject
    .split("")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-")
  const addArticle = new blog({
    ...req.body,
    permalink,
    userId: req.user.id,
  })
  try {
    const archivedPost = await addArticle.save()
    res.status(201).json(archivedPost)
  } catch (error) {
    next(error)
  }
}

export const loadPost = async (req, res, next) => {
  // console.log("Request received with query parameters:", req.query) // Log request query params
  try {
    const initialPosition = parseInt(req.query.initialPosition) || 0
    const maxItems = parseInt(req.query.maxItems) || 12
    const sortingOrder = req.query.order === "asc" ? 1 : -1
    const blogs = await blog
      .find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.products && { products: req.query.products }),
        ...(req.query.permalink && { permalink: req.query.permalink }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchText && {
          $or: [
            { subject: { $regex: req.query.searchText, $options: "i" } },
            { content: { $regex: req.query.searchText, $options: "i" } },
          ],
        }),
      })
      .sort({ updatedAt: sortingOrder })
      .skip(initialPosition)
      .limit(maxItems)

    //console.log("Blogs found:", blogs) // Debugging found blogs

    const totalCount = await blog.countDocuments()
    //console.log("Total count of blogs:", totalCount) // Debugging total count

    const currentTime = new Date()

    const lastMonth = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth() - 1,
      currentTime.getDate()
    )

    const previousMonthPosts = await blog.countDocuments({
      createdAt: { $gte: lastMonth },
    })

    res.status(200).json({
      blogs,
      totalCount,
      previousMonthPosts,
    })
  } catch (error) {
    //console.error("Error loading posts:", error) // Debugging error
    next(error)
  }
}

export const removePost = async (req, res, next) => {
  if (!req.user.administrator || req.user.userId !== req.params.userId) {
    return next(
      errorHandler(
        403,
        "Your access does not include post deletion privileges."
      )
    )
  }
  try {
    await blog.findByIdAndDelete(req.params.postId)
    res.status(200).json("The post has been deleted successfully.")
  } catch (error) {
    next(error)
  }
}

export const editPost = async (req, res, next) => {
    // console.log("Edit Post Params:", req.params) // Log the parameters
    if (!req.user.administrator || req.user.userId !== req.params.userId) {
      return next(errorHandler(403, "You are not authorized to edit this post."))
    }
    try {
      if (!req.params.postId) {
        return next(errorHandler(400, "Post ID is required.")) // Ensure postId is required
      }
      const editedPost = await blog.findByIdAndUpdate(
        req.params.postId,
        {
          $set: {
            subject: req.body.subject,
            content: req.body.content,
            products: req.body.products,
            image: req.body.image,
          },
        },
        { new: true }
      )
      if (!editedPost) {
        return res.status(404).json({ error: "Post not found" })
      }
      res.status(200).json(editedPost)
    } catch (error) {
      next(error)
    }
  }
  
