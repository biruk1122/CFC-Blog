// Import the React library
import React, { useState } from "react"
// Import the Link component from React Router for navigation
import { Link, useNavigate } from "react-router-dom"
// Import components from flowbite-react library
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react"
import OAuth from "../components/OAuth"

// Define a functional component named SignUp
export default function SignUp() {
  // Define state for form details
  const [formDetails, setFormDetails] = useState({})
  // Define state for error messages
  const [errorMessage, setErrorMessage] = useState(null)
  // Define state for loading status
  const [loading, setLoading] = useState(false)
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
    if (!formDetails.username || !formDetails.email || !formDetails.password) {
      return setErrorMessage("Please fill all fields.")
    }
    try {
      // Set loading state to true
      setLoading(true)
      // Clear any previous error message
      setErrorMessage(null)
      // Make a POST request to the signup endpoint
      const res = await fetch("/api/authentication/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      })
      // Parse the response JSON
      const data = await res.json()
      // Check if the response indicates failure
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      // Set loading state to false
      setLoading(false)
      // If the response is OK, navigate to the sign-in page
      if (res.ok) {
        navigate("/sign-in")
      }
    } catch (error) {
      // Set the error message if an exception occurs
      setErrorMessage(error.message)
      // Set loading state to false
      setLoading(false)
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
            <span className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 text-white py-1 px-3 rounded">
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
              <Label value="username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={fieldChangeHandler}
                className="w-full"
              />
            </div>
            <div>
              <Label value="email" />
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
                placeholder="password"
                id="password"
                onChange={fieldChangeHandler}
                className="w-full"
              />
            </div>
            {/* Render a button for form submission */}
            <Button
              type="submit"
              // Specify button styles with gradient background
              className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 text-white py-2 px-4 rounded
              hover:from-pink-500 hover:via-red-500 hover:to-yellow-500"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          {/* Render a div for additional text and link */}
          <div className="flex gap-2 text-sm mt-6">
            <span>Have an account?</span>
            {/* Render a link to sign-in page with specified styles */}
            <Link to="/sign-in" className="text-blue-700">
              Sign In
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
