import { useState, React } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const handleClick = () => {
    setVisible(!visible)
    console.log(visible)
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
          <p>like {blog.likes} <button>like</button></p>
          <p>{blog.author}</p>
        </div>
      ) : (
        <TitleAndButton title={blog.title} />
      )}
    </div>
  )
}

export default Blog