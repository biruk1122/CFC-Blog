// Import React library to use JSX and React components
import React from "react"

// Import the useSelector hook from react-redux to access the Redux store
import { useSelector } from "react-redux"

// Define and export the ThemeProvider component which takes children as props
export default function ThemeProvider({ children }) {
  // Use the useSelector hook to get the current theme from the Redux store
  const { theme } = useSelector((state) => state.theme)

  // Return a div that sets the class to the current theme (either "light" or "dark")
  return (
    <div className={theme}>
      {/* 
        Nested div to apply background and text colors based on the theme.
        - bg-white: white background for light mode
        - text-gray-700: dark gray text color for light mode
        - dark:text-gray-200: light gray text color for dark mode
        - dark:bg-[rgb(13,17,27)]: dark background color for dark mode
        - min-h-screen: ensures the div takes at least the full height of the viewport
      */}
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(13,17,27)] min-h-screen">
        {/* Render the children components passed to the ThemeProvider */}
        {children}
      </div>
    </div>
  )
}
