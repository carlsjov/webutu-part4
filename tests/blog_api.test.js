const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('tests with supertest', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there is two (2) initial blogs', async () => {
        const response = await api.get('/api/blogs')
        
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('adding one more blog', async () => {
        const newBlog = {
            title: "Otsikko3",
            author: "Testi Kolmone",
            url: "testi3.fi",
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)

        const blogsAfter = await helper.blogsInDb()
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('deleting first one', async () => {
        const blogsFirst = await helper.blogsInDb()
        const firstId = blogsFirst[0]
        
        await api.delete(`/api/blogs/${firstId.id}`)

        const blogsAfter = await helper.blogsInDb()
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)

        const blogIdsAfter = blogsAfter.map(r => r.id)

        expect(blogIdsAfter).not.toContain(firstId.id)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})