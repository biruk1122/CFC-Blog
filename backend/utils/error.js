// Define and export a function named 'errorHandler' to create custom error objects
export const errorHandler = (statusCode, message) => {
  // Create a new error object
  const error = new Error()
  // Set the status code of the error
  error.statusCode = statusCode
  // Set the message of the error
  error.message = message
  // Return the custom error object
  return error
}
