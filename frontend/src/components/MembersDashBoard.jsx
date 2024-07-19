import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Table, Modal, Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { FaCheck, FaTimes } from "react-icons/fa"

export default function MembersDashBoard() {
  const { currentUser } = useSelector((state) => state.user)
  const [members, setmembers] = useState([])
  const [viewMore, setViewMore] = useState(true)
  const [displayModal, setDisplayModal] = useState(false)
  const [memberIdForDeletion, setMemberIdForDeletion] = useState(null)

  //console.log(authorPublications)

  //console.log("currentUser at render:", currentUser)
  //console.log("authorPublications at render:", authorPublications)

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await fetch(`/api/user/loadmembers`)
        const details = await res.json()
        // console.log("Response from fetch:", details)

        if (res.ok) {
          setmembers(details.members)
          //console.log("Updated authorPublications:", details.posts)
          if (details.members.length < 8) {
            setViewMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser.administrator) {
      getMembers()
    }
  }, [currentUser._id])

  const handleLoadMore = async () => {
    const indexStart = members.length
    try {
      const res = await fetch(`/api/user/loadmembers?indexStart=${indexStart}`)
      const data = await res.json()
      if (res.ok) {
        setmembers((prev) => [...prev, ...data.members])
        if (data.members.length < 8) {
          setViewMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const manageDeleteMember = async () => {
    try {
      const res = await fetch(`/api/user/delete/${memberIdForDeletion}`, {
        method: "DELETE",
      })
      const details = await res.json()
      if (res.ok) {
        setmembers((prev) =>
          prev.filter((user) => user._id !== memberIdForDeletion)
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
      {currentUser.administrator && members.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Created On</Table.HeadCell>
              <Table.HeadCell>Member image</Table.HeadCell>
              <Table.HeadCell>Membername</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {members.map((member) => (
              <Table.Body className="divide-y" key={member._id}>
                <Table.Row className="bg-white dark:border-gray-800 dark:bg-gray-900">
                  <Table.Cell>
                    {new Date(member.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={member.avatar}
                      alt={member.username}
                      className="w-10 h-10 object-cover bg-gray-200 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{member.username}</Table.Cell>
                  <Table.Cell>{member.email}</Table.Cell>
                  <Table.Cell>
                    {member.administrator ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-blue-900" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setDisplayModal(true)
                        setMemberIdForDeletion(member._id)
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
        <p>There are currently no members to display.</p>
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
              Are you certain you wish to permanently delete this member?
            </h2>
            <div className="flex justify-center gap-6">
              <Button color="failure" onClick={manageDeleteMember}>
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
