import { useState, React } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleClick = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    blogService.addLike(blog, likes + 1)
    setLikes(likes + 1)
    const newBlogs = blogs.map(n =>
      n.id === blog.id ? { ...n, likes: n.likes + 1 } : n
    )
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
  }

  //adding a blog does not show remove buttong???
  //refreshing does
  //only compare ID's but then there is problem on how to get ID


  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const newBlogs = blogs.filter(n => n.id !== blog.id)
      setBlogs(newBlogs)
      blogService.deleteBlog(blog)
    }
  }

  const TitleAndButton = ({ title }) => {
    return (
      <p>{title} <button onClick={() => handleClick()}>view</button> </p>
    )
  }

  return (
    <div style={blogStyle}>
      { visible ? (
        <div>
          <TitleAndButton title={blog.title} />
          <p>{blog.url}</p>
          <p>like {likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.author}</p>
          {((user.username === blog.user.username)) && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      ) : (
        <TitleAndButton title={blog.title} />
      )}
    </div>
  )
}

export default Blog