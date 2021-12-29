import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()

  dispatch(setUsers())

  const users = useSelector(state => state.users)

  if (!users || Object.keys(users).length === 0 || users.length === 0) {
    return (
      <div>
        ERROR - NOT USERS
      </div>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
