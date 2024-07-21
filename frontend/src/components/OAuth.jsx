// Import React to use JSX syntax
import React from "react"
// Import Button component from Flowbite React library
import { Button } from "flowbite-react"
// Import Google icon from react-icons library
import { AiFillGoogleCircle } from "react-icons/ai"
// Import Flowbite CSS for styling
import "flowbite/dist/flowbite.css"
// Import Firebase authentication utilities
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
// Import Firebase app configuration
import { app } from "../firebase"
// Import useDispatch hook from Redux to dispatch actions
import { useDispatch } from "react-redux"
// Import loginSuccess action from user slice
import { loginSuccess } from "../App/user/userSlice"
// Import useNavigate hook from react-router-dom for navigation
import { useNavigate } from "react-router-dom"

// Define and export the OAuth component
export default function OAuth() {
  // Define and export the OAuth component
  const userAuth = getAuth(app)
  // Define and export the OAuth component
  const redirectTo = useNavigate()
  // Get the dispatch function
  const dispatch = useDispatch()

  // Define the Google sign-in function
  const onGoogleSignIn = async () => {
    // Create a new GoogleAuthProvider instance
    const authProvider = new GoogleAuthProvider()
    // Set custom parameters to prompt account selection
    authProvider.setCustomParameters({ prompt: "select_account" })

    try {
      // Sign in with Google using a popup
      const googleApiResults = await signInWithPopup(userAuth, authProvider)
      // Send Google user info to backend
      const result = await fetch("api/authentication/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Set request headers
        // Set request body with user info
        body: JSON.stringify({
          name: googleApiResults.user.displayName,
          email: googleApiResults.user.email,
          googlePhotoUrl: googleApiResults.user.photoURL,
        }),
      })
      // Parse the response data
      const data = await result.json()

      // If the response is okay
      if (result.ok) {
        // Dispatch loginSuccess action with user data
        dispatch(loginSuccess(data))
        // Redirect to the home page
        redirectTo("/home")
      }
    } catch (error) {
      console.log(error) // Log any errors
    }
  }
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      onClick={onGoogleSignIn} // Set onClick handler to Google sign-in function
    >
      {/* Display Google icon */}
      <AiFillGoogleCircle className="w-6 h-6 mr-2" /> Continue with Google
      account
    </Button>
  )
}
