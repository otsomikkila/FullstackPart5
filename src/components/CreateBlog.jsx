import { useState } from 'react'
import blogService from '../services/blogs'
import blogs from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    //console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    //console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    //console.log(event.target.value)
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
    console.log('title', blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    //send blog object to api and update blogs that are shown
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