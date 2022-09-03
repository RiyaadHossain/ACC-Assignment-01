const express = require('express');
const PORT = process.env.PORT || 5000
const app = express()

app.get("/", (req, res) => res.send({ message: "Hello World!" }))
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`))