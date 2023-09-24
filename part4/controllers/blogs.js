const blogsRouter = require("express").Router()
const Blog = require("../models/blog.js")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {name: 1})
    response.json(blogs)
  })

blogsRouter.post('/', async (request, response) => {
    if (!request.token) {
      return response.status(400).json({error: "Need token, none found"})
    }

    const user = request.user
    const {title, author, url, likes} = request.body
    const newBlog = new Blog({title, author, url, likes, user: user._id})

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  })

blogsRouter.delete("/", async (request, response) => {
  if (!request.token) {
    return response.status(400).json({error: "Need token, none found"})
  }

  const user = request.user
  const blog = await Blog.deleteOne(request.body)
  user.blogs = user.blogs.filter(x => blog._id !== x)
  await user.save()

  response.status(200).json(blog)
})


module.exports = blogsRouter