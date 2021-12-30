import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const padding = {
    paddingRight: 5
  }

  const handleLogout = () => {
    dispatch(removeUser(user))
  }

  return (
    <div>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      <span>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </span>
    </div>
  )
}

export default Navigation
