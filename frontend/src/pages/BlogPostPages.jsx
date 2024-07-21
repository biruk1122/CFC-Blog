import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Spinner } from "flowbite-react"
import CallToAction from "../components/CallToAction"
import Comment from "../components/Comment"
import PostCard from "../components/PostCard"

export default function BlogPostPages() {
  const { blogPermalink } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [blog, setBlog] = useState(null)
  const [recentPosts, setRecentPosts] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      //console.log("Fetching blog with permalink:", permalink) // Debugging permalink
      try {
        setLoading(true)
        const res = await fetch(`/api/post/loadPost?permalink=${blogPermalink}`)
        //console.log("Fetch response:", res) // Debugging response
        const data = await res.json()
        //console.log("Response from API:", data) // Debugging response
        if (!res.ok) {
          setError(true)
          setLoading(false)
          return
        }
        if (res.ok) {
          setBlog(data.blogs[0])
          setLoading(false)
          setError(false)
        }
      } catch (error) {
        //console.error("Error fetching blog:", error) // Debugging error
        setError(true)
        setLoading(false)
      }
    }
    fetchBlog()
  }, [blogPermalink])

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/loadPost?maxItems=3`)
        const data = await res.json()
        if (res.ok) {
          setRecentPosts(data.blogs)
        }
      }
      fetchRecentPosts()
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    )
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {blog && blog.subject}
      </h1>
      <Link
        to={`/search?products=${blog && blog.products}`}
        className="self-center mt-6"
      >
        <Button color="gray" pill size="xs">
          {blog && blog.products}
        </Button>
      </Link>
      <img
        src={blog && blog.image}
        alt={blog && blog.subject}
        className="mt-10 p-3 max-h-[500px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-yellow-500 mx-auto w-full max-w-2xl text-xs">
        <span>{blog && new Date(blog.createdAt).toLocaleDateString()}</span>
        <span>{blog && (blog.content.length / 1000).toFixed(0)}mins read</span>
      </div>
      <div
        className="p-4 max-w-2xl mx-auto w-full blog-content"
        dangerouslySetInnerHTML={{ __html: blog && blog.content }}
      ></div>
      <div className="">
        <CallToAction />
      </div>
      <Comment postId={blog._id} />
      <div className="flex flex-col justify-center items-center mb-6">
        <h1 className="text-xl mt-6">Recent Posts</h1>
        <div className=" flex flex-row gap-5 mt-5 ">
          {recentPosts &&
            recentPosts.map((blog) => <PostCard key={blog._id} blog={blog} />)}
        </div>
      </div>
    </main>
  )
}
