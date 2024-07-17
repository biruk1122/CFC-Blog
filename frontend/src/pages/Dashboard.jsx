import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ProfileSideBar from "../components/ProfileSideBar"
import Profile from "../components/Profile"

export default function Dashboard() {
  const destination = useLocation()
  const [tab, setTab] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(destination.search)
    const tabFromUrl = urlParams.get("tab")
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [destination.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-60">
        {/* Sidebar */}
        <ProfileSideBar />
      </div>
      {/* Profile  */}
      {tab === "profile" && <Profile />}
      {/*post*/}
      {tab === "posts" && <PostPages />}
    </div>
  )
}
