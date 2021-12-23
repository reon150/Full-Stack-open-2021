import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      blogService
        .getAll()
        .then(blogs => {
          setBlogs(blogs)
        })
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
  
      blogService.setToken(user.token)
      const blogs = await blogService.getAll()
      setBlogs(blogs)

      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('You have successfully logged in')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const addBlog = (noteObject) => {
    blogService
      .create(noteObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setSuccessMessage(`a new blog '${returnedNote.title}' by ${returnedNote.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <Notification message={errorMessage} type={'error'} />
      <Notification message={successMessage} type={'success'} />  
      {user === null ? 
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        /> : 
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>
          <BlogForm createNewBlog={addBlog} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App