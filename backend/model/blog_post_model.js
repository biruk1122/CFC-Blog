import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://venngage-wordpress.s3.amazonaws.com/uploads/2020/10/Anatomy-of-the-Perfect-Blog-Post.png",
    },
    products: {
      type: String,
      default: "uncatagorized",
    },
    permalink: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const blog = mongoose.model("blog", blogSchema)

export default blog
