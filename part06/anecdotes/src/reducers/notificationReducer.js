const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return `you created the note '${action.data.content}'`
    case 'VOTE':
      return `you voted '${action.data.content}'`
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const resetNotification = () => ({
  type: 'RESET_NOTIFICATION',
  data: { },
})

export default notificationReducer
