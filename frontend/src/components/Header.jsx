// Import components from flowbite-react
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"

// Import React and useState hook
import React, { useEffect, useState } from "react"

// Import Link and useLocation from react-router-dom
import { Link, useLocation, useNavigate } from "react-router-dom"
// Import search icon from react-icons/ai
import { AiOutlineSearch } from "react-icons/ai"
// Import moon icon from react-icons/fa
import { FaMoon, FaSun } from "react-icons/fa"
// Import the useSelector and useDispatch hooks from react-redux
import { useSelector, useDispatch } from "react-redux"
// Import the toggleTheme action creator from the themeSlice file
import { toggleTheme } from "../App/theme/themeSlice"
import { logOutSuccess } from "../App/user/userSlice"

// Define the Header component
export default function Header() {
  // Get the current pathname using useLocation hook
  const path = useLocation().pathname
  // Retrieve the useDispatch hook from react-redux to dispatch actions
  const dispatch = useDispatch()
  // Get the current user from the Redux state
  const { currentUser } = useSelector((state) => state.user)
  // Define state variable for toggling the navbar menu
  const [isOpen, setIsOpen] = useState(false)
  // Retrieve the current theme state from the Redux store using useSelector hook
  const { theme } = useSelector((state) => state.theme)
  const [searchTerm, setSearchTerm] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

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

  const handeleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("searchTerm", searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  return (
    /* Header Section */
    <Navbar className="border-b-2 sticky-header">
      {/* Logo */}
      <Link
        to="/home"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Chilalo Food Complex
        </span>
        Blog
      </Link>

      {/* Large Screen Search bar */}
      <form
        onSubmit={handeleSubmit}
        className="hidden lg:flex lg:items-center lg:w-full lg:justify-center"
      >
        <TextInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      {/* Mobile search button */}
      <Button className="w-12 h-10 lg:hidden bg-yellow-500">
        <AiOutlineSearch />
      </Button>

      {/* Other buttons */}
      <div className="flex gap-2 md:order-2">
        {/* Dark mode button */}
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          // Handle button click event to toggle theme using Redux dispatch
          onClick={() => dispatch(toggleTheme())}
        >
          {/* Render moon icon if theme is light, otherwise render sun icon */}
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>

        {currentUser ? ( // Check if a user is currently logged in
          <Dropdown // If logged in, render a Dropdown component
            arrowIcon={false} // Disable the arrow icon for the dropdown
            inline // Display the dropdown inline
            // Label for the dropdown, showing the user's avatar
            label={
              // Avatar component with the user's image and rounded styling
              <Avatar alt="user avatar" img={currentUser.avatar} rounded />
            }
          >
            {/* Header section of the dropdown*/}
            <Dropdown.Header>
              {/* Display the user's username */}
              <span className="block text-sm">@{currentUser.username}</span>
              {/* Display the user's email address, truncated if too long */}
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {/* Link to the user's profile page */}
            <Link to={"/dashboard?tab=profile"}>
              {/* Dropdown item for the profile*/}
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            {/* Divider to separate dropdown items*/}
            <Dropdown.Divider />
            {/* Dropdown item for signing out */}
            <Dropdown.Item onClick={logoutUser}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          // If no user is logged in
          // Link to the sign-in page
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue">Sign In</Button>
          </Link>
        )}
        <Navbar.Toggle onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Menus Links */}
      <Navbar.Collapse
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex lg:items-center lg:justify-center lg:w-auto`}
      >
        <Navbar.Link as={"div"}>
          <Link
            to="/home"
            className={`${path === "/home" ? "text-red-500 font-bold" : ""}`}
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link
            to="/about"
            className={`${path === "/about" ? "text-red-500 font-bold" : ""}`}
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link
            to="/products"
            className={`${
              path === "/products" ? "text-red-500 font-bold" : ""
            }`}
          >
            Products
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
