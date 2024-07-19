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