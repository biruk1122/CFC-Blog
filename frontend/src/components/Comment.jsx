import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button, Textarea, Modal } from "flowbite-react"
import DisplayComment from "./DisplayComment"
import { HiOutlineExclamationCircle } from "react-icons/hi"

export default function Comment({ postId }) {
  const { currentUser } = useSelector((state) => state.user)
  const [statement, setStatement] = useState("")
  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState(null)
  //console.log(comments)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (statement.length > 300) {
      return
    }

    try {
      const res = await fetch("/api/comment/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: statement,
          postId,
          userId: currentUser._id,
        }),
      })

      
      //  console.log("Fetch response:", res)

      if (!res.ok) {
        console.error("Error response from server:", res.status, res.statusText)
        return
      }

      const data = await res.json()
      console.log("Response JSON:", data)

      if (res.ok) {
        setStatement("")
        setComments([data, ...comments])
      }
    } catch (error) {
      console.error("Error during fetch:", error)
    }
  }

  
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComment/${postId}`)
        if (res.ok) {
          const data = await res.json()
          setComments(data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getComments()
  }, [postId])

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in")
        return
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      })
      if (res.ok) {
        const data = await res.json()
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        )
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className="max-w-2xl mx-auto w-full p-4">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-600 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-6 w-6 object-cover rounded-full"
            src={currentUser.avatar}
            alt="Profile Picture"
          />
          <Link
            className="text-yellow-500 hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 text-sm text-yellow-500 my-5">
          you must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}