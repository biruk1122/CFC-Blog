// Import the createSlice function from @reduxjs/toolkit
import { createSlice } from "@reduxjs/toolkit"

// Define the initial state for the slice
const initialState = {
  currentUser: null, // Represents the current user, initially null
  error: null, // Represents any error message, initially null
  loading: false, // Represents the loading state, initially false
}

// Create a slice of the Redux state with the specified name, initial state, and reducers
const profileSlice = createSlice({
  name: "slice user", // The name of the slice
  initialState, // The initial state for the slice
  reducers: {
    // Define a reducer to handle the login initiation action
    loginInitiate: (state) => {
      state.loading = true // Set loading to true
      state.error = null // Clear any previous error
    },
    // Define a reducer to handle the login success action
    loginSuccess: (state, action) => {
      state.currentUser = action.payload // Set the current user to the payload of the action
      state.loading = false // Set loading to false
      state.error = null // Clear any previous error
    },
    // Define a reducer to handle the login failure action
    loginFailure: (state, action) => {
      state.loading = false // Set loading to false
      state.error = action.payload // Set the error to the payload of the action
    },
    updateStart: (state) => {
      state.loading = true
      state.error = null
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    updateFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    initiateUserDeletion: (state) => {
      state.loading = true
      state.error = null
    },
    userDeletionSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    userDeletionFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logOutSuccess: (state) => {
      state.currentUser = null
      state.error = null
      state.error = null
      state.loading = false
    },
  },
})

// Export the action creators generated by createSli
export const {
  loginInitiate,
  loginSuccess,
  loginFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  initiateUserDeletion,
  userDeletionFailure,
  userDeletionSuccess,
  logOutSuccess,
} = profileSlice.actions

// Export the reducer function generated by createSlice
export default profileSlice.reducer
