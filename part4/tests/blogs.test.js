const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require("../models/blog.js")
const User = require("../models/user.js")
const helper = require("../utils/test_helper")

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
    // User.insertMany()
    await Blog.insertMany(helper.initialBlogs)
})


describe("Getting initial blogs", () => {
    test("Testing blogs are returned as JSON", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })
    
    test("Testing blogs content are correct", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    
    test("Testing unique identifier property is id", async () => {
        const response = await api.get("/api/blogs")
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })
})

describe("Testing posts", () => {
    test("have same length and contains title", async () => {
        await api
            .post('/api/blogs')
            .send(helper.sampleBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
      const blogsAfter = await helper.blogsInDB()
      expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
    
      const titles = blogsAfter.map(n => n.title)
      expect(titles).toContain(helper.sampleBlog.title)
    })
})

describe("testing deletes", () => {
    test("length is one less and title disappeared", async () => {
        const deleteObj =  {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
        }
    
        await api
            .delete(`/api/blogs`)
            .send(deleteObj)
            .expect(200)

        const blogsAfter = await helper.blogsInDB()
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)
        expect(blogsAfter.some(b => b.title === deleteObj.title)).toBe(false)
    })
})

describe("testing updates", () => {
    test("title changed", async () => {
        const blogsToChange = await helper.blogsInDB()
        const blogToChange = blogsToChange[0]
        const id = blogToChange["id"]
        blogToChange.title = "title changed"

        await api
                .put(`/api/blogs/${id}`)
                .send(blogToChange)
                .expect(200)

        const blogsAfter = await helper.blogsInDB()
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length)

        const titles = blogsAfter.map(n => n.title)
        expect(titles).toContain(blogToChange.title)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
  })