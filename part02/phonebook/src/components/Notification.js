const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`message ${message.type}`}>
      {message.content}
    </div>
  )
}

export default Notification