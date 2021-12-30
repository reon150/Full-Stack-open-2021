import loginService from '../services/login'
import storage from '../utils/storage'

const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOG_USER':
    case 'SET_USER':
      storage.saveUser(action.data)
      return action.data
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export const logUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    dispatch({
      type: 'LOG_USER',
      data: user,
    })
  }
}

export const setUser = (user) => ({
  type: 'SET_USER',
  data: user
})

export const removeUser = () => {
  storage.logoutUser()
  return ({
    type: 'REMOVE_USER',
  })
}

export default userReducer