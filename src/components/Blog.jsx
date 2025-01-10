import { useState, React } from 'react'
import blogService from '../services/blogs'

export const TitleAndButton = ({ blog, toggleVisibility, buttonText}) => {
  return (
    <p>{blog.title} {blog.author}<button className='toggleButton' onClick={toggleVisibility}>{buttonText}</button> </p>
  )
}

export const Blog = ({ blog, blogs, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = () => {
    blogService.addLike(blog, likes + 1)
    setLikes(likes + 1)
    const newBlogs = blogs.map(n =>
      n.id === blog.id ? { ...n, likes: n.likes + 1 } : n
    )
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
  }


  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const newBlogs = blogs.filter(n => n.id !== blog.id)
      setBlogs(newBlogs)
      blogService.deleteBlog(blog)
    }
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className='blog'>
      <TitleAndButton blog={blog} toggleVisibility={toggleVisibility} buttonText={'view'}/>
      <div className='togglableContent'>
        <div style={hideWhenVisible}></div>
        <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>likes {likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.author}</p>
          {((user.username === blog.user.username)) && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      </div>
    </div>
  )
}