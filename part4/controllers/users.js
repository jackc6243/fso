const bcrypt = require("bcrypt")
const User = require("../models/user.js")
const usersRouter = require("express").Router()

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", {title: 1, author: 1, likes: 1})
    response.status(200).json(users)
})


usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body

    if (username.length < 4) {
        return response.status(400).json({error: "username must be at least 4 characters"})
    }

    if (password.length < 4) {
        return response.status(400).json({error: "password must be at least 4 characters"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash,
        blogs: []
    })
    const savedUser = await newUser.save(newUser)
    response.status(201).json(savedUser)
})



module.exports = usersRouter