// Import the React library
import React, { useState } from "react"
// Import the Link component from React Router for navigation
import { Link, useNavigate } from "react-router-dom"
// Import components from flowbite-react library
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react"
// Import action creators from userSlice for Redux state management
import {
  loginInitiate,
  loginSuccess,
  loginFailure,
} from "../App/user/userSlice"
// Import useDispatch and useSelector hooks for Redux state interaction
import { useDispatch, useSelector } from "react-redux"
import OAuth from "../components/OAuth"

// Define a functional component named SignIn
export default function SignIn() {
  // Define state for form details using useState hook
  const [formDetails, setFormDetails] = useState({})
  // Extract loading and error state variables from Redux store using useSelector
  const { loading, error: errorMessage } = useSelector((state) => state.user)
  // Retrieve dispatch function from Redux store
  const dispatch = useDispatch()
  // Hook for programmatic navigation
  const navigate = useNavigate()
  // Handler function to update form state when input fields change
  const fieldChangeHandler = (e) => {
    // Update the formDetails state with the new input value, trimming any whitespace
    setFormDetails({ ...formDetails, [e.target.id]: e.target.value.trim() })
  }
  // Handler function to handle form submission
  const submitAction = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault()

    // Check if any required field is empty
    if (!formDetails.email || !formDetails.password) {
      // Dispatch loginFailure action with error message if fields are empty
      return dispatch(loginFailure("Please fill all fields."))
    }
    try {
      // Dispatch loginInitiate action to set loading state
      dispatch(loginInitiate())

      // Make a POST request to the signin endpoint with formDetails
      const res = await fetch("/api/authentication/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      })
      // Parse the response JSON
      const data = await res.json()

      // Check if the response indicates failure
      if (data.success === false) {
        // Dispatch loginFailure action with error message from server
        dispatch(loginFailure(data.message))
      }

      // If the response is OK, update user state with loginSuccess action and navigate to home
      if (res.ok) {
        dispatch(loginSuccess(data))
        navigate("/home")
      }
    } catch (error) {
      // Dispatch loginFailure action with error message if request fails
      dispatch(loginFailure(error.message))
    }
  }
  // Return JSX representing the component's UI
  return (
    // Render a div with classes for minimum screen height and top margin
    <div className="min-h-screen mt-20">
      {/* Render a flex container with specified layout and spacing */}
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6">
        {/* Render the left side content */}
        {/* Use flex-1 class to distribute remaining space evenly */}
        <div className="flex-1">
          {/* Render a link to the home page with specified styles */}
          <Link to="/" className="font-bold dark:text-white text-4xl">
            {/* Render a span with gradient background and text styles */}
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500 
          via-purple-500 to-pink-500 rounded-lg text-white"
            >
              CFC Daily
            </span>
            Blogs
          </Link>

          {/* Render a paragraph with specified styles and margin */}
          <p className="text-sm mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc
            urna, sagittis vehicula orci ac, varius posuere est. Vivamus laoreet
            nisl quis mauris dignissim blandit. Quisque porta laoreet diam eget
            aliquet.
          </p>
        </div>

        {/* Render the right side content */}

        {/* Use flex-1 class to distribute remaining space evenly */}
        <div className="flex-1">
          {/* Render a form with specified layout and spacing */}
          <form className="flex flex-col gap-6" onSubmit={submitAction}>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={fieldChangeHandler}
                className="w-full"
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={fieldChangeHandler}
                className="w-full"
              />
            </div>
            {/* Render a button for form submission */}
            <Button
              type="submit"
              // Specify button styles with gradient background
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded 
              hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          {/* Render a div for additional text and link */}
          <div className="flex gap-2 text-sm mt-6">
            <span>Don't have an account?</span>
            {/* Render a link to sign-in page with specified styles */}
            <Link to="/sign-up" className="text-blue-700">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
