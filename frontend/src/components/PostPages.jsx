import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Table, Modal, Button } from "flowbite-react"
import { Link } from "react-router-dom"
import { HiOutlineExclamationCircle } from "react-icons/hi"

export default function PostPages() {
  const { currentUser } = useSelector((state) => state.user)
  const [authorPublications, setAuthorPublications] = useState([])
  const [viewMore, setViewMore] = useState(true)
  const [displayModal, setDisplayModal] = useState(false)
  const [postIdForDeletion, setPostIdForDeletion] = useState(null)

  //console.log(authorPublications)

  //console.log("currentUser at render:", currentUser)
  //console.log("authorPublications at render:", authorPublications)

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/post/loadpost?userId=${currentUser._id}`)
        const details = await res.json()
        // console.log("Response from fetch:", details)

        if (res.ok) {
          setAuthorPublications(details.blogs)
          //console.log("Updated authorPublications:", details.posts)
          if (details.blogs.length < 12) {
            setViewMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser.administrator) {
      getPost()
    }
  }, [currentUser._id])

  const handleLoadMore = async () => {
    const indexStart = authorPublications.length
    try {
      const res = await fetch(
        `/api/post/loadpost?userId=${currentUser._id}&indexStart=${indexStart}`
      )
      const data = await res.json()
      if (res.ok) {
        setAuthorPublications((prev) => [...prev, ...data.blogs])
        if (data.blogs.length < 12) {
          setViewMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const manageDeletePost = async () => {
    setDisplayModal(false)
    try {
      const res = await fetch(
        `/api/post/removepost/${postIdForDeletion}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      )
      const details = await res.json()
      if (!res.ok) {
        console.log(details.message)
      } else {
        setAuthorPublications((prev) =>
          prev.filter((blogs) => blogs._id !== postIdForDeletion)
        )
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
      {currentUser.administrator && authorPublications.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Updated on</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Subject</Table.HeadCell>
              <Table.HeadCell>Products</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {authorPublications.map((blogs) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-800 dark:bg-gray-900">
                  <Table.Cell>
                    {new Date(blogs.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/blogs/${blogs.permalink}`}>
                      <img
                        src={blogs.image}
                        alt={blogs.subject}
                        className="w-25 h-10 object-cover bg-gray-200"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/blogs/${blogs.permalink}`}>
                      {blogs.subject}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{blogs.products}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setDisplayModal(true)
                        setPostIdForDeletion(blogs._id)
                      }}
                      className="font-medium text-red-700 hover:text-red-300 cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-blogs/${blogs._id}`}>
                      <span className="font-medium text-blue-700 hover:text-blue-300 cursor-pointer">
                        Edit
                      </span>
                    </Link>
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
        <p>There are currently no posts to display.</p>
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
              Are you certain you wish to permanently delete this post?
            </h2>
            <div className="flex justify-center gap-6">
              <Button color="failure" onClick={manageDeletePost}>
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
