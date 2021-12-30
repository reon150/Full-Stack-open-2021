import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(setUsers())
  }, [])


  if (!users || Object.keys(users).length === 0 || users.length === 0) {
    return (
      <div>
        ERROR - NOT USERS
      </div>
    )
  }

  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>)}
      </ul>
    </div>
  )
}

export default Users
