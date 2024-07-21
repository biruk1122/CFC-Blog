import React, { useEffect, useState } from "react"

export default function DisplayComment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({})

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
}
