// Import the configureStore function from @reduxjs/toolkit
import { configureStore, combineReducers } from "@reduxjs/toolkit"
// Import the userReducer from the userSlice file
import userReducer from "./user/userSlice"
import themeReducer from "./theme/themeSlice"
// Import persistReducer and persistStore from redux-persist
import { persistReducer, persistStore } from "redux-persist"
// Import storage from redux-persist
import storage from "redux-persist/lib/storage"

// Combine userReducer into a root reducer
const combinedReducer = combineReducers({
  // Add the userReducer to the combined reducer
  user: userReducer,
  // Add the themeReducer to the combined reducer
  theme: themeReducer,
})

// Combine userReducer into a root reducer
const storageConfig = {
  key: "storaage_key", // Unique identifier for persisting state
  storage, // Storage engine to use for persistence
  version: 1, // State versioning for migrations
}

// Create a persisted reducer using redux-persist
const persistedReducer = persistReducer(storageConfig, combinedReducer)

// Configure and create the Redux store
export const store = configureStore({
  reducer: persistedReducer, // Root reducer with persistence
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Disable serializable check for Redux Toolkit
})

// Create a persistor using persistStore for hydration and persistence
export const persistor = persistStore(store)
