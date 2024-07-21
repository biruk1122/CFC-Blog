import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Table, Modal, Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"

export default function CommentDashBoard() {
  const { currentUser } = useSelector((state) => state.user)
  const [comments, setComments] = useState([])
  const [viewMore, setViewMore] = useState(true)
  const [displayModal, setDisplayModal] = useState(false)
  const [commentIdForDeletion, setCommentIdForDeletion] = useState(null)

  //console.log(authorPublications)

  //console.log("currentUser at render:", currentUser)
  //console.log("authorPublications at render:", authorPublications)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`)
        const details = await res.json()
        // console.log("Response from fetch:", details)

        if (res.ok) {
          setComments(details.comments)
          //console.log("Updated authorPublications:", details.posts)
          if (details.comments.length < 8) {
            setViewMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser.administrator) {
      fetchComments()
    }
  }, [currentUser._id])

  const handleLoadMore = async () => {
    const indexStart = comments.length
    try {
      const res = await fetch(
        `/api/comment/getComments?indexStart=${indexStart}`
      )
      const data = await res.json()
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments])
        if (data.comments.length < 8) {
          setViewMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const manageDeleteComment = async () => {
    setDisplayModal(false)
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdForDeletion}`,
        {
          method: "DELETE",
        }
      )
      const details = await res.json()
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdForDeletion)
        )
        setViewMore(false)
        setDisplayModal(false)
      } else {
        console.log(details.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-4 scrollbar 
    scrollbar-track-slate-500 scrollbar-thumb-slate-300
     dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser.administrator && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-800 dark:bg-gray-900">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setDisplayModal(true)
                        setCommentIdForDeletion(comment._id)
                      }}
                      className="font-medium text-red-700 hover:text-red-300 cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {viewMore && (
            <button
              onClick={handleLoadMore}
              className="w-full text-amber-500 self-center text-sm py-8"
            >
              View More
            </button>
          )}
        </>
      ) : (
        <p>There are currently no comments to display.</p>
      )}
      <Modal
        show={displayModal}
        onClose={() => setDisplayModal(false)}
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
              <Button color="failure" onClick={manageDeleteComment}>
                Yes
              </Button>
              <Button color="gray" onClick={() => setDisplayModal(false)}>
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
