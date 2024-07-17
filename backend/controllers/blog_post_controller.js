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
