import express from "express"

const app = express()

app.listen(3000, () => {
  console.log("Server operational at port 3000!!!") // Log a message when the server starts
})
