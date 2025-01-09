import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({ message, messageStyle }) => {
  if (message) {
    return (
      <div className={messageStyle}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState('message')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Login successful')
      setMessageStyle('message')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageStyle('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Notification 
          message={message}
          messageStyle={messageStyle}
        />
        <div>
          <h2>Log in to application</h2>
          <Login 
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification 
          message={message}
          messageStyle={messageStyle}
      />
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in </p>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      <h2>create new</h2>
      <Togglable buttonLabel='new note'>
        <CreateBlog 
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setMessageStyle={setMessageStyle}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog 
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      )}
    </div>
  )
}

export default App