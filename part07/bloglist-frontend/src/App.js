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
import { logUser, setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import Navigation from './components/Navigation'
import { Button, Form } from 'react-bootstrap'

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

  if (!user || Object.keys(user).length === 0) {
    return (
      <div className='container'>
        <h2>login to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              id='username'
              {...username}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password:</Form.Label>
            <Form.Control
              id='password'
              {...password}
            />
          </Form.Group>
          <Button variant='primary' id='login' type='submit'>login</Button>
        </Form>
      </div>
    )
  }

  return (
    <div className='container'>
      <Router>
        <Navigation />

        <h2>blog app</h2>

        <Notification />

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
    </div>
  )
}

export default App