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

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    )
  }

  const handleDelete = async (commentId) => {
    setShowModal(false)
    // console.log(`Deleting comment with ID: ${commentId}`)
    try {
      if (!currentUser) {
        navigate("/sign-in")
        return
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        const data = await res.json()
        setComments(comments.filter((comment) => comment._id !== commentId))
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
      {currentUser && (
        <form
          onSubmit={handleFormSubmit}
          className="border border-yellow-500 rounded-md p-4"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="300"
            onChange={(e) => setStatement(e.target.value)}
            value={statement}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-600 text-xs">
              {300 - statement.length} characters remaining
            </p>
            <Button className="bg-yellow-500" type="submit">
              Submit
            </Button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No Comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-500 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <DisplayComment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true)
                setCommentToDelete(commentId)
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-12 w-12 text-red-600 dark:text-gray-300 mb-6 mx-auto" />
            <h2 className="mb-6 text-lg text-red-500 ">
              Are you certain you wish to permanently delete this comment?
            </h2>
            <div className="flex justify-center gap-6">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
