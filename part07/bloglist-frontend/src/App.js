import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import storage from './utils/storage'
import useField from './hooks/useField'
import { initializeBlogs } from './reducers/blogReducer'
import { removeUser, logUser, setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUser = storage.loadUser()
    if ((loggedUser) && (!user || (Object.keys(user).length === 0))) {
      dispatch(setUser(loggedUser))
      dispatch(initializeBlogs())
      notifyWith(`${loggedUser.name} welcome back!`)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    dispatch(setNotification({
      message, type
    }, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(logUser(username.value, password.value))
      resetUsername()
      resetPassword()
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const handleLogout = () => {
    dispatch(removeUser(user))
    storage.logoutUser()
  }

  if (!user || Object.keys(user).length === 0) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              {...username}
            />
          </div>
          <div>
            password
            <input
              id='password'
              {...password}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  return (
    <Router>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog />
      </Togglable>

      <Routes>
        <Route exact path='/users/:id' element={<User />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/blogs/:id' element={<BlogDetails />} />
        <Route path='/' element={<BlogList />} />
      </Routes>

    </Router>
  )
}

export default App