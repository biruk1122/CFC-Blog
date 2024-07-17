import React, { useEffect, useState } from "react"
import { Sidebar } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { HiUser, HiArrowSmRight } from "react-icons/hi" // Assuming you are using react-icons
import { logout } from "./path-to-logout-action" // Adjust the path to your logout action

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

  const logoutUser = () => {
    dispatch(logout())
  }

  return (
    <Sidebar className="w-full md:w-60">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-2">
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
