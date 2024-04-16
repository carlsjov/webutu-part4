const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Otsikko1",
        author: "Testi Ykkönen",
        url: "testi1.fi",
        likes: 1
    },
    {
        title: "Otsikko2",
        author: "Testi Kakkonen",
        url: "testi2.fi",
        likes: 2
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}