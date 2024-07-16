// Import createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit"

// Define initial state for the theme slice
const initialState = {
  theme: "light", // Initial theme state is set to "light"
}

// Create a slice of Redux state for managing theme-related actions and state
const themeSlice = createSlice({
  name: "theme", // Name of the slice within Redux state
  initialState, // Initial state object defined above
  reducers: {
    toggleTheme: (state) => {
      // Toggle between "light" and "dark" themes based on current state
      state.theme = state.theme === "light" ? "dark" : "light"
    },
  },
})

// Extract the action creators from the created slice
export const { toggleTheme } = themeSlice.actions

// Export the reducer function generated by createSlice
export default themeSlice.reducer
