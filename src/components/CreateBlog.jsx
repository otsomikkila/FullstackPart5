import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs, setMessage, setMessageStyle }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const returnedBlog = await blogService.createBlog(blogObject)
    //console.log('title', blogObject)
    //console.log(blogObject)
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    setMessage(`a new blog ${newTitle} by ${newAuthor} added`)
    setMessageStyle('message')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
          title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
          author:
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
          url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      <div>
        <button type="create">add</button>
      </div>
    </form>
  )
}

export default CreateBlog