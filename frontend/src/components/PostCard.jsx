import React from "react"
import { Link } from "react-router-dom"

export default function PostCard({ blog }) {
  return (
    <div
      className="group relative w-full border
       border-yellow-500 hover:border-2 h-[400px] overflow-hidden 
    rounded-lg sm:w-[350px] transition-all"
    >
      <Link to={`/blogs/${blog.permalink}`}>
        <img
          className="h-[260px] w-full object-cover group-hover:h-[200px] 
          transition-all duration-300 z-20"
          src={blog.image}
          alt="image"
        />
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{blog.subject}</p>
        <span className="italic text-sm">{blog.products}</span>
        <Link
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border
           border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white 
           transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
          to={`/blogs/${blog.permalink}`}
        >
          Read Post
        </Link>
      </div>
    </div>
  )
}
