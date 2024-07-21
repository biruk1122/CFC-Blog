import React from "react"
import { Sidebar } from "flowbite-react"
import {
  HiUser,
  HiArrowSmRight,
  HiOutlineUserGroup,
  HiDocumentText,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { logOutSuccess } from "../App/user/userSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export default function ProfileSideBar() {
  const { currentUser } = useSelector((state) => state.user)
  const destination = useLocation()
  const [tab, setTab] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    const urlParms = new URLSearchParams(destination.search)
    const tabFromUrl = urlParms.get("tab")
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [destination.search])
  const logoutUser = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        dispatch(logOutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Sidebar className="w-full md:w-60">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-2">
          <>
            {currentUser.administrator && (
              <Sidebar.Item
                as={Link}
                to="/dashboard?tab=dash"
                active={tab === "dash" || !tab}
                icon={HiChartPie}
              >
                Dashboard
              </Sidebar.Item>
            )}
          </>

          <Sidebar.Item
            as={Link}
            to="/dashboard?tab=profile"
            active={tab === "profile"}
            icon={HiUser}
            label={currentUser.administrator ? "Admin" : "User"}
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>
          {currentUser.administrator && (
            <Sidebar.Item
              as={Link}
              to="/dashboard?tab=posts"
              active={tab === "posts"}
              icon={HiDocumentText}
            >
              Posts
            </Sidebar.Item>
          )}
          {currentUser.administrator && (
            <>
              <Sidebar.Item
                as={Link}
                to="/dashboard?tab=members"
                active={tab === "members"}
                icon={HiOutlineUserGroup}
              >
                Members
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                to="/dashboard?tab=comments"
                active={tab === "comments"}
                icon={HiAnnotation}
              >
                Comments
              </Sidebar.Item>
            </>
          )}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={logoutUser}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
