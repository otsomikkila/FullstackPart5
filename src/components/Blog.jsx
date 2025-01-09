import { useState, React } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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
          <p>like {likes} <button onClick={() => handleLike()}>like</button></p>
          <p>{blog.author}</p>
        </div>
      ) : (
        <TitleAndButton title={blog.title} />
      )}
    </div>
  )
}

export default Blog