// Import the React library
import React from "react"
// Import the ReactDOM library to render React components to the DOM
import ReactDOM from "react-dom/client"
// Import the main App component
import App from "./App.jsx"
// Import the global CSS file for styling
import "./index.css"
// Import the Redux store from the store configuration file
import { store, persistor } from "./App/store.js"
// Import the Provider component from react-redux to make the store available to the entire app
import { Provider } from "react-redux"
// Import PersistGate component from redux-persist to delay rendering until persisted state is retrieved
import { PersistGate } from "redux-persist/integration/react"
// Import ThemeProvider component to apply theming to the entire app
import ThemeProvider from "./components/ThemeProvider.jsx"

// Create a root element and render the App component inside it, wrapping it with the Provider component to connect the Redux store to the app
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrap the App component with PersistGate to delay rendering until persisted state is retrieved
  <PersistGate persistor={persistor}>
    {/* Provide the Redux store to the entire app*/}
    <Provider store={store}>
      {/* Provide the theme context to the entire app */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
)
