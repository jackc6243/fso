const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')
const app = express()
const cors = require('cors')


const blogsRouter = require("./controllers/blogs.js")
const usersRouter = require("./controllers/users.js")
const loginRouter = require("./controllers/login.js")
const config = require("./utils/config.js")
const middleware = require("./utils/middleware.js")

mongoose.connect(config.MONGODB_URI)
    .catch(error => {
        console.log("can't connect to mongodb server", error)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/login",loginRouter)
app.use('/api/users', middleware.userExtractor, usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app