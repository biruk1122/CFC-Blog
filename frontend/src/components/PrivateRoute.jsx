// Import the React library
import React from "react"

// Import the useSelector hook from react-redux to access the Redux store's state
import { useSelector } from "react-redux"

// Import Outlet and Navigate components from react-router-dom for routing
import { Outlet, Navigate } from "react-router-dom"

// Define the PrivateRoute component as the default export
export default function PrivateRoute() {
  // Get the currentUser from the Redux store's state
  const { currentUser } = useSelector((state) => state.user)

  // If currentUser exists, render the Outlet component
  // otherwise, navigate to the sign-in page
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />
}
