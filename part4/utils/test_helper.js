const Blog = require("../models/blog.js")

const initialUsers = [
  {
    username: "testuser1",
    name: "hello",
    password: "abcd1234"
  },
  {
    username: "jack",
    name: "G00d$bye",
    password: "Hello1234"
  }
]

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "testuser1"
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user: "testuser1"
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        user: "testuser1"
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        user: "jack"
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: "jack"
      },
]

const sampleBlog =  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: "jack"
}

const totalLikes = (blogs) => {
    
    return blogs.reduce((c, a) => c + a.likes, 0)
}
  
const mostLikes = (blogs) => {
    const m = Math.max(...blogs.map(x => Number(x.likes)))
    return blogs.length === 0
    ? []
    : blogs.filter(x => x.likes === m)[0]
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    totalLikes,
    mostLikes,
    blogsInDB,
    initialBlogs,
    sampleBlog
  }
