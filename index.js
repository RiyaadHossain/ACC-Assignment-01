const express = require('express');
const PORT = process.env.PORT || 5000
// const userRoute = require("./router/userRoute")

const app = express()

// Middleware
app.use(express.json())
// app.use("/user", userRoute)

// Health Check
app.get("/", (req, res) => {
    res.send("Hello, Programming Hero!")
})

// Listen to PORT
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})