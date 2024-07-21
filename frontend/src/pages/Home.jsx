import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CallToAction from "../components/CallToAction"
import PostCard from "../components/PostCard"

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/post/loadpost")
      const data = await res.json()
      setPosts(data.blogs)
    }
    fetchPost()
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welecome To Chilalo Food Complex Blog
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm">
          Chilalo Food Complex is a dynamic and innovative food company
          dedicated to providing high-quality, nutritious, and delicious food
          products. Leveraging advanced technology and sustainable practices,
          Chilalo Food Complex ensures that every product meets the highest
          standards of taste and health. Our commitment to excellence and
          customer satisfaction makes us a trusted name in the food industry.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-yellow-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-4 bg-amber-100 dark:bg-slate-800">
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-center pb-2">
              Chilalo Food Complex Posts
            </h2>
            <div className="flex flex-wrap gap-6">
              {posts.map((blog) => (
                <PostCard key={blog._id} blog={blog} />
              ))}
            </div>
            <Link
              className="text-lg text-yellow-500 hover:underline text-center"
              to="/search"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
