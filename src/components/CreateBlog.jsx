import { useState } from 'react'

const CreateBlog = ({  setMessage, setMessageStyle, createBlog }) => {
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
    createBlog(blogObject)
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
    <form onSubmit={addBlog} data-testid='blogform'>
      <div>
          title:
        <input
          data-testid='title'
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
          author:
        <input
          data-testid='author'
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
          url:
        <input
          data-testid='url'
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