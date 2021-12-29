const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
  }
}

let setNotificationTimeout

export const setNotification = (notification, notificationTime) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    clearTimeout(setNotificationTimeout)
    setNotificationTimeout = setTimeout(
      () =>
        dispatch({
          type: 'RESET_NOTIFICATION',
          notification,
        }),
      notificationTime * 1000
    )
  }
}

export default notificationReducer
