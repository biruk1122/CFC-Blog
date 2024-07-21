import React, { useEffect, useState } from "react"
import moment from "moment"
import { FaThumbsUp } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Button, Textarea } from "flowbite-react"

export default function DisplayComment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({})
  const { currentUser } = useSelector((state) => state.user)
  const [editing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)
  //console.log(user)
  useEffect(() => {
    if (!comment || !comment.userId) {
      console.error("displayComment or displayComment.userId is not defined")
      return
    }

    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`)
        const data = await res.json()
        if (res.ok) {
          setUser(data)
        } else {
          console.error("Failed to fetch user:", res.statusText)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getUser()
  }, [comment])

  const handeleEdit = () => {
    setEditing(true)
    setEditedContent(comment.content)
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      })
      if (res.ok) {
        setEditing(false)
        onEdit(comment, editedContent)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  ame = "text-gray-500 hover:text-red-500"
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-300"
          src={user.avatar}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {editing ? (
          <>
            <Textarea
              className="mb-3"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-3 text-xs">
              <Button
                onClick={handleSave}
                type="button"
                size="sm"
                className="bg-yellow-500"
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setEditing(false)}
                className="bg-yellow-500"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 pb-2">{comment.content}</p>
            <div
              className="flex items-center pt-2 text-xs border-t 
        dark:border-gray-800 max-w-fit gap-2"
            >
              <button
                className={`text-gray-500 hover:text-yellow-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
                type="button"
                onClick={() => onLike(comment._id)}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-500">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    "" +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId ||
                  currentUser.administrator) && (
                  <>
                    <button
                      type="button"
                      onClick={handeleEdit}
                      className="text-gray-500 hover:text-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      classN
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
