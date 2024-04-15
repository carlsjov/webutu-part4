const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const likeArray = blogs.map(blog => blog.likes)
    const total = likeArray.reduce((sum, like) => sum+like, 0)
    return total;
}

module.exports = {
    dummy, totalLikes
}